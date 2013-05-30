var http = require('http');
var port = 8080;

var server = http.createServer(function(req,res){
	var laterOut;
	req.pipe(laterOut);
	later+=" REQ COMPLETE";
	// res.write(laterOut);
	console.log(laterOut);
	res.end();	
})

server.listen(port);