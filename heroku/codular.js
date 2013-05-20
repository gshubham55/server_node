var http = require('http');

var port = 9000;
var count=0;
var clients= {};

var server = http.createServer(function(req,res){
    console.log((new Date()) + ' Received request for ' + req.url);
	res.writeHead(200);
	// res.end("adios bitchios");
});

server.listen(port,function(){
	console.log((new Date()) + ' server is On AND Hot');
});

var WebSocketServer = require('websocket').server;
wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request',function(request){
    var connection = request.accept('echo-protocol', request.origin);
	var id = count++; //  specifies id for client, initializing from 0
	clients[id]= connection;
	console.log((new Date()) + ' Connection accepted [' + id + ']');
	connection.on('message',function(message){
		var msgString = message.utf8Data;
		for ( var i in clients)
		{
			clients[i].sendUTF(msgString);
		}
	});

    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
        delete clients[id];
    });
})