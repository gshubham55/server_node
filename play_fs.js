// chat server working on port 8080 (localhost)


var http = require('http');
var WebSocketServer = require('websocket').server;
var express = require('express');

var port = 4000;
var count=0;
var msgCount=0;
var curClients=0;
var clients= {};

var server = http.createServer(function(req,res){
    console.log((new Date()) + ' Received request for ' + req.url);
    res.writeHead(200);
    // res.end("adios bitchios");
});

server.listen(port,function(){
    console.log((new Date()) + ' server is On AND Hot');
});

function printClients(){
    console.log((new Date()) + ' Total Clients Connected: ' + curClients);
}

setInterval(printClients,100000);
wsServer = new WebSocketServer({
    httpServer: server,
    // To verify origin and validity of the request.
    autoAcceptConnections: false

});

function originIsAllowed(origin){
        // TODO: put logic here
        return true;
}

wsServer.on('request',function(request){
    
    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }


    var connection = request.accept('echo-protocol', request.origin);
	var id = ++count; //  specifies id for client, initializing from 1
	clients[id]= connection;
    curClients++;
	console.log((new Date()) + ' Connection accepted [' + id + ']');
	
    connection.on('message',function(message){
	    
        if (message.type === 'utf8')
        {

            // console.log("rec");
            var msgString = message.utf8Data;
            msgCount+=1;
    		// console.log( (new Date()) + " Message Received Type:UTF8 MSGCOUNT: "+ msgCount);
            console.log(msgString)
      //       for ( var i in clients)
    		// {
    		// 	clients[i].sendUTF(msgString);
    		// }
        }

        else if (message.type==='binary')
        {
            // console.log("rec");

            msgCount+=1;
            console.log( (new Date())+ ' Message Received Type: Binary, Length: ' + message.binaryData.length + ' bytes '+ 'MSGCOUNT: '+ msgCount);
            console.log("")
            // for (var i in clients)
            // {
            //     clients[i].sendBytes(message.binaryData);
            // }                
        }

	});

    connection.on('close', function(reasonCode, description) {
            curClients--;
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
        delete clients[id];
    });
})