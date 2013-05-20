var net = require('net');
var sys = require('sys');
// var fs = require('fs');
var host = '127.0.0.1';
var port = 8080;
var server = net.createServer(function (socket) {
	socket.on("connect",function()
		{
			console.log('\nConnection established at:' + socket.remoteAddress);
			sys.puts("adsfs"	)
		});
	 socket.write("Hello World!\n");
	// socket.end();
	socket.on("end",function(){
		console.log("\nConnection closed");
	});
}).listen(port,host);