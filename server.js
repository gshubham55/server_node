// var sys = require("sys"),  
// http = require("http"); 
// var count =0; 
// http.createServer(function(request,response){  
//     count++;
//     sys.puts("it got hit again : "+count);  
//     //console.log(JSON.stringify(request.headers));
//     response.writeHeader(200, {"Content-Type": "text/plain"});  
//     response.write("Hello World!");  
//     response.end();  
// }).listen(8080)
// sys.puts("Server Running on 8080"); 
var net = require('net');
var sys = require('sys');
var host = '127.0.0.1';
var port = 8080;
var count =0;
net.createServer(function (socket) {
	console.log('connected: ' + socket.remoteAddress);
	
	count++;
	socket.addListener("connect", function () {
    sys.puts("Connection from " + socket.remoteAddress + "count :" + count);
    socket.write("Hello World\n");
    
    });
	socket.addListener("data", function (data) {
    socket.write(data);
    socket.end();
    });
        
    
}).listen(port,host);
console.log("server running on 8080");