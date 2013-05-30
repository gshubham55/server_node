// File Transfer server ( node based ) listening on port 8080

var http = require('http');
var fs = require('fs');
var port = 8080;
var fileNumber=0;

var server = http.createServer(function ( req,res){
	res.write("Adios Bitchios");
	res.end();

})

server.listen(port);

//curl --upload-file fileName.extension http://localhost:8080