var http = require('http'),
	fs = require('fs'),
	url = require("url"),
    path = require("path"),
    express = require("express")
	port = 8080;

// http.createServer(function (req, res) {
// 	res.writeHead(200, {'Content-Type': 'text/html'});
	// var publicFolder = path.join(process.cwd(),"/public");
	// var uri = url.parse(req.url).pathname;

	// if(uri=="/") 
	// 	uri = "/index.html";

	// var filename = path.join(publicFolder, uri);

// 	var fileout = fs.readFileSync(filename);

// 	req.sendfile(fileout);
// 	res.end();
// }).listen(port);

var app = express();
var filename = "/index.html";
app.listen(port,function(req,res){

	var publicFolder = path.join(process.cwd(),"/public");
	var uri = url.parse(req.url).pathname;

	if(uri=="/") 
		uri = "/index.html";

	filename = path.join(publicFolder, uri);
});
app.get(filename,function(req,res){
	res.sendfile("public/index.html");
})