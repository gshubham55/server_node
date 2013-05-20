/**
 * Assignment
 *
 * fenix - simple node based implementation of http server
 *
 * */

//include the required module net
var tcp = require('net');

PORT = 6599;
HOST = 'localhost';
browsers = {};

//create the tcp server
var fenix = tcp.createServer(function(socket){
    //gather client address
    clientAddr = socket.address();

    //log the connection status
    console.log("Fenix to client(" + clientAddr.address +  ") connection established...");

    /* read http headers */
    socket.on('data', function(data){
        raw_headers = data.toString();
        headers = raw_headers.split('\r\n');

        //object to
        json = {};
        //loop through each header line
        for(headerline_index in headers) {
            headerLine = headers[headerline_index];
            //extract header
            header = headerLine.substr(0, headerLine.indexOf(':')).trim();
            //extract value of header
            value = headerLine.substr(headerLine.indexOf(":") + 1).trim();

            //add property value pair to json object
            json[header] = value;

            //write the raw header to socket
            socket.write(header + (headerLine.indexOf(':') > 0?" : ":"") + value + "\r\n");

        }
        //increment count for users browser
        if(browsers.hasOwnProperty(json['User-Agent'])) {
            browsers[json['User-Agent']]++;
        } else {
            browsers[json['User-Agent']] = 1;
        }

        socket.end('Hello World from Fenix..:)\r\n');

        //log the count for that browser
        socket.write('A total of ' + browsers[json['User-Agent']]  + ' requests with that browser since I spawned.\n');

        console.log(data.toString());
    });


    //on connection end
    socket.on('end', function(){
        console.log('Connection Terminated.');
    });

    //end the connections   
    socket.pipe(socket);
});

//handle server errors
fenix.on('error', function(error){
    //port already in use by another server
    if(error.code == 'EADDRINUSE') {
        console.log("Port already in use by other server.");
        //retry to listen again
        setTimeout(function(){
            fenix.close();
            fenix.listen(PORT, HOST);
        }, 1000);
    }
});

//bind the server to listen on HOST:PORT
fenix.listen(PORT, HOST);
console.log('Listening on localhost:6599');