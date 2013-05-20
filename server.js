var net = require('net');
var sys = require('sys');
// var fs = require('fs');
var host = '127.0.0.1';
var port = 8080;
var count =0;
var server = net.createServer(function (socket) {
    
    
    count++;
    socket.on("connect", function () {
        console.log('\nconnected: ' + socket.remoteAddress);
        sys.puts( "count : " + count);
    
    
    });
    // socket.write('content-type : text/plain');
    
    socket.write("Hello World!\n");
    socket.on("data", function (data) {
    socket.write(data.toString());
    // socket.end();
    var responseHeaders={
      "Content-Length": "1000",
      "Content-Type":"plain/text",
      "Server":"lunatic"
    }
    var str = "HTTP/1.1 200 OK\r\n";
    
    socket.write(str);
   
    for(i in responseHeaders){
      socket.write(i+": "+responseHeaders[i]+"\r\n");
    }
  
     socket.write("\r\n");
    });
    
    // var fileStream = fs.createReadStream('me.jpg');
    // fileStream.pipe(socket);
  //   socket.pipe(socket);
    // socket.end();
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
    socket.on("end",function()
    {
        console.log("Connection closed");
    });

}).listen(port,host);
console.log("server running on 8080");