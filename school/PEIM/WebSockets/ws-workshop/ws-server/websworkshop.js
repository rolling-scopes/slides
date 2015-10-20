var WebSocketServer = require('websocket').server;
var http = require('http');
var connections = [];
var server = http.createServer(function (request, response) {
	response.writeHead(200, { 'Content-Type': 'text/html' });
	response.end('<img src="' + canvas.toDataURL() + '" />');
});
server.listen(8080, function () { });

var Canvas = require('canvas')
  , canvas = new Canvas(800, 600)
  , ctx = canvas.getContext('2d');

ctx.lineCap = 'round';
ctx.lineJoin = 'round';

// create the server
wsServer = new WebSocketServer({ 
	httpServer: server,
	port: 1337
});

// WebSocket server
wsServer.on('request', function (request) {
	var connection = request.accept(null, request.origin);
	connections.push(connection);

	connection.sendUTF(JSON.stringify({
		message: "image",
		data: canvas.toDataURL()
	}));

	// This is the most important callback for us, we'll handle
	// all messages from users here.
	connection.on('message', function (message) {
		if (message.type === 'utf8') {
			// process WebSocket message
			var data = JSON.parse(message.utf8Data);
			switch (data.message) {
				case 'draw':
					switch (data.data.type) {
						case 'line':
							ctx.beginPath();
							ctx.strokeStyle = data.data.color;
							ctx.lineWidth = data.data.width;
							ctx.moveTo(data.data.x1, data.data.y1);
							ctx.lineTo(data.data.x2, data.data.y2);
							ctx.stroke();
							ctx.closePath();
							break;
					}
					for (var i = 0, length = connections.length; i < length; i++) {
						if (connections[i] !== connection) {
							connections[i] && connections[i].sendUTF(message.utf8Data);
						}
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
