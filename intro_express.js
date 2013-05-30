var express = require('express');
var port = 8080;

var app = express();

app.get('/', function(req, res){
	
	// res.send("hello lolita");
	res.sendfile("html/index.html");
});

app.listen(port);