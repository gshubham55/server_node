var http = require('http');
var fs = require('fs');

var port =8080;


var server = http.createServer(function(req,res){
	res.writeHead(200);
	res.write("welcome\n");
	var newFile = fs.createWriteStream('file/new.md');
	req.pipe(newFile);
	// req.pipe(res);
	req.on('end',function(){
		res.end("DOne bitch!\n");
	})
})
server.listen(port);

var WebSocketServer = require('websocket').server;
wsServer = new WebSocketServer({
    httpServer: server
});
console.log("listening on port 8080");