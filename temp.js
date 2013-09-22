 connection.connect(function(err){
        if(err != null) {
            res.end('Error connecting to mysql:' + err+'\n');
        }
    });
 
      
      // Query the database to some data 
    connection.query("SELECT * from mb.g WHERE ref = '806787088'", function(err, rows){
 
        // There was a error or not?
        if(err != null) {
            res.end("Query error:" + err);
        } else {
            // Shows the result on console window
            console.log(rows[0]);
            res.end("Success!");
        }
 
        // Close connection
        connection.end();
    });
 
