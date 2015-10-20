var WebSocketServer = require('websocket').server;
var http = require('http');
var connections = [];
var index = 1;
var server = http.createServer(function (request, response) {
	response.writeHead(200, { 'Content-Type': 'text/html' });
	response.end('<h1>Chat application for the frontend dev conf.</h1>');
});
server.listen(8080, function () { });

// create the server
wsServer = new WebSocketServer({
	httpServer: server,
	port: 1337
});

// WebSocket server
wsServer.on('request', function (request) {
	var connection = request.accept(null, request.origin);
	connections.push(connection);
	connection.login = 'anonymous' + index++;

	// This is the most important callback for us, we'll handle
	// all messages from users here.
	connection.on('message', function (message) {
		if (message.type === 'utf8') {
			// process WebSocket message
			var data = JSON.parse(message.utf8Data);
			var length = connections.length
			switch (data.type) {
				case 'text':
					for (var i = 0; i < length; i++) {
						connections[i] && connections[i].sendUTF(JSON.stringify({
							text: data.value,
							login: connection.login
						}));
					}
					break;
				case 'login':
					if (data.value) {
						this.login = data.value;
					}
					break;
			}
		}
	});

	connection.on('close', function (connection) {
		// close user connection
		for (var i = 0, length = connections.length; i < length; i++) {
			if (connections[i] === connection) {
				connections.splice(i, 1);
				break;
			}
		}
	});
});
