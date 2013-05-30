// var app = require('express')();
// 	http = require('http'),
// 	server = http.createServer(app),
// 	io = require('socket.io').listen(server);

// io.sockets.on('connection', function(client){
// 	console.log('client connected');
// 	client.emit('messages',{hello:'adios bitchios'})
// });

// // listen.server(8080);

var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
  console.log('connenction est');
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});