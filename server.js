var net = require('net');
var sys = require('sys');
var host = '127.0.0.1';
var port = 8080;
var count =0;
var server = net.createServer(function (socket) {
	
	
	count++;
	socket.addListener("connect", function () {
        console.log('\nconnected: ' + socket.remoteAddress);
        sys.puts( "count : " + count);
    
    
    });
	socket.addListener("data", function (data) {
    socket.write(data);
    socket.end();
    });
    socket.write("Hello World!\n");

    socket.on("end",function()
    {
        console.log("Connection closed");
    });
    socket.on("error", function (error)
    {
        if (error.code=='EADDRINUSE') {
            console.log("Address/port in use, retrying....");
            setTimeout(function(){
                server.close();
                server.listen(port,host);
            },1000);
        }
    });

}).listen(port,host);
console.log("server running on 8080");