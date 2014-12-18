//    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
//    <script src="http://documentcloud.github.io/underscore/underscore.js"></script>

var steps = (function($, _) {

    var steps = {};

    var log = console.log.bind(console);
        log.as = function(symbol) {
            return _.partial(log, symbol);
        };

    _.mixin({
        traverseTree: function (fnInvoke, childrenProperty, root) {
            fnInvoke(root);
            _(root[childrenProperty])
                .each(_.partial(this.traverseTree, fnInvoke, childrenProperty));
        }.bind(_)
    });

    steps.prerequisites = function() {
        log('Make sure you\'ve run [Chrome Canary] with the following flags:');
        log('    Server: chrome.exe --disable-web-security --remote-debugging-port=9222');
        log('    Client: chrome.exe --disable-web-security');
        log('---------------------------------------------------------------');
        log('');
        return $.Deferred().resolve();
    };

    steps.getInspectablePages = function() {
        var url = 'http://localhost:9222/json';
        return $.ajax(url);
    };

    steps.getTargetPage = function(d) {
        var targetName = 'Test page';
        return _(d).find(function(pageObject) {
            return pageObject.title === targetName;
        });
    };

    var CommandsTunnel = function(url) {
        var o = this;
        o.counter = 0;
        o.notifications = {};
        o.results = [];

        o.send           = o.send.bind(o);
        o.dispatch       = o.dispatch.bind(o);
        o.onNotification = o.onNotification.bind(o);

        o.sent      = $.Callbacks();
        o.recd      = $.Callbacks();

        var s = o.socket = new WebSocket(url);
        s.onopen    = o.createTrigger('opened');
        s.onclose   = o.createTrigger('closed');
        s.onerror   = o.createTrigger('failed');
        s.onmessage = o.dispatch;
    };

    CommandsTunnel.prototype = {

        createTrigger: function(name) {
            return _.partial((this[name] = $.Deferred()).resolve, this);
        },

        send: function(cmd) {
            var o = this;

            cmd.id = (++o.counter);
            var $r = $.Deferred();
            o.results[cmd.id] = $r;

            var str = JSON.stringify(cmd);
            o.socket.send(str);
            o.sent.fire(cmd);

            return $r;
        },

        dispatch: function(r) {
            var o = this;

            var jsonMsg = JSON.parse(r.data);

            o.recd.fire(jsonMsg);

            _(jsonMsg).has('error')  && o.results[jsonMsg.id].reject(jsonMsg);
            _(jsonMsg).has('result') && o.results[jsonMsg.id].resolve(jsonMsg);
            _(jsonMsg).has('method') && o.onNotification(jsonMsg.method).resolve(jsonMsg);
        },

        onNotification: function(name) {
            var o = this;
            o.notifications[name] = o.notifications[name] || $.Deferred();
            return o.notifications[name];
        }
    };

    steps.createSocket = function(pageObject) {
        var url = 'ws://localhost:9222/devtools/page/' + pageObject.id;
        return (new CommandsTunnel(url)).opened;
    };

    steps.initializeLogging = function(tunnel) {
        tunnel.sent.add(log.as('>>> '));
        tunnel.recd.add(log.as('\t*** '));
        window['send'] = tunnel.send;
        return tunnel;
    };

    steps.initializeSettings = function(tunnel) {
        var commands = _.compact([
            ,{"method":"Worker.canInspectWorkers"}
            ,{"method":"CSS.getSupportedCSSProperties"}
            ,{"method":"Network.enable"}
            ,{"method":"Page.enable"}
            ,{"method":"Network.enable"}
            ,{"method":"Page.getResourceTree"}
            ,{"method":"Debugger.canSetScriptSource"}
            ,{"method":"Debugger.enable"}
            ,{"method":"CSS.enable"}
            ,{"method":"Console.enable"}
            ,{"method":"Inspector.enable"}
            ,{"method":"Database.enable"}
            ,{"method":"DOMStorage.enable"}
            ,{"method":"Profiler.enable"}
            ,{"method":"Page.setShowViewportSizeOnResize","params":{"show":true,"showGrid":false}}
            ,{"method":"Runtime.enable"}
            ,{"method":"Debugger.setPauseOnExceptions","params":{"state":"none"}}
        ]);

        var $result = $.Deferred();

        (function asyncQueue() {
            var cmd = commands.shift();
            !cmd ? ($result.resolve(tunnel))
                 : (tunnel
                       .send(cmd)
                       .fail(log.as('err: '))
                       .done(asyncQueue));
        })();

//        _(commands).each(tunnel.send);
//        $result.resolve(tunnel);

        return $result;
    };

    steps.startProfiler = function(tunnel) {
        var $r = $.Deferred();

        tunnel
            .send({"method":"Profiler.start"})
            .done(_.partial($r.resolve, tunnel));

        return $r;
    };

    steps.executeTestAction = function(tunnel) {
        var $r = $.Deferred();

        tunnel
            .onNotification('Runtime.executionContextCreated')
            .done(function(n) {
                var contextId = n.params.context.id;
                tunnel
                    .send({
                        "method":"Runtime.evaluate",
                        "params":{
                            "expression":"$('#btn').click()",
                            "objectGroup":"console",
                            "includeCommandLineAPI":true,
                            "doNotPauseOnExceptionsAndMuteConsole":false,
                            "contextId":contextId,
                            "returnByValue":false,
                            "generatePreview":true
                        }
                    })
                    .done(_.partial($r.resolve, tunnel));
            });

        return $r;
    };

    steps.takeProfileResults = function(tunnel) {

        var statResults = $.Deferred();
        tunnel
            .send({"method":"Profiler.stop"})
            .done(function(h) {
                tunnel
                    .send({
                        "method":"Profiler.getCPUProfile",
                        "params":{
                            "uid":h.result.header.uid
                        }
                    })
                    .done(function(c) {

                        log.as('profile: ')(c.result.profile.head);

                        var childrenProperty = 'children';
                        var accumulator = [];
                        var invoke = function(node) {
                            var item = _(node).omit(childrenProperty);
                            accumulator.push(item);
                        };

                        _.traverseTree(
                                invoke,
                                childrenProperty,
                                c.result.profile.head);

                        statResults.resolve(accumulator);
                    });
            });

        return statResults;
    };

    steps.defaultResultLogging = function(statResults) {
        _(statResults)
                .chain()
                .sortBy(function(x) {
                    return -1 * x.selfTime;
                })
                .each(function(x) {
                    log([
                        '###:\t',
                        x.selfTime,
                        '\t',
                        x.totalTime,
                        '\t\t\t',
                        x.functionName
                    ].join(''));
                })
                .value();
    };

    return steps;

})(jQuery, _);

var run = _.partial(function($, _, steps, options) {

    var eventsLogging = options.eventsLogging || steps.initializeLogging;
    var resultLogging = options.resultLogging || steps.defaultResultLogging;

    steps

        .prerequisites()                        // 0

        .then(steps.getInspectablePages)        // 1

        .then(steps.getTargetPage)              // 2

        .then(steps.createSocket)               // 3

        .then(eventsLogging)                    // 4

        .then(steps.initializeSettings)         // 5

        .then(steps.startProfiler)              // 6

        .then(steps.executeTestAction)          // 7

        .then(steps.takeProfileResults)         // 8

        .then(resultLogging)                    // 9

        ;

}, jQuery, _, steps);