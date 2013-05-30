var http = require('http');

var makeReq= function(message){
	 var options = {
	 	host : 'localhost', port : 8080, path : '/', method : 'POST'
	 }

	 var req = http.createServer(options, function(res){
	 	res.on('data',function(data){
	 		console.log(data);
	 	});
	 });

	 req.write(message);
	 req.end();
}

exports = makeReq;