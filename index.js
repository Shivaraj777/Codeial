//importing express module
const express = require('express');
const app = express();

const port = 8000;

//use express router
app.use('/', require('./routes'));  //this routes all the url's present in current file to the routes folder files

//starting a server
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);  //interpolation
        return;
    }
    console.log(`Server is running on port : ${port}`);
});