// File Transfer server ( node based ) listening on port 8080

var http = require('http');
var fs = require('fs');
var port = 8080;
var fileNumber=0;

var server = http.createServer(function ( req,res){
	var outFile = fs.createWriteStream("file/new" + fileNumber + ".md");
	fileNumber++;
	
	var fileBytes = req.headers['content-length'];
	var uploadedBytes = 0;

	req.pipe(outFile);

	req.on('data', function (chunk){
		uploadedBytes+=chunk.length;
		var progress = (uploadedBytes/fileBytes)*100;
		res.write('progress: ' + parseInt(progress,10) + '%\n');
	});

	req.on('end', function(){
		res.end('Uploaded.\nAdios Bitchios.\n');
	});
})

server.listen(port);

//curl --upload-file fileName.extension http://localhost:8080