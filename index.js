//importing express module
const express = require('express');
const app = express();
const port = 8000;
//importing the mongoose module
const db = require('./config/mongoose');
//importing the express layouts module
const expressLayouts = require('express-ejs-layouts');
//extract style and scripts from the sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//middleware to access the static files in assets folder
app.use(express.static('./assets'));
//use express Layouts
app.use(expressLayouts);

//use express router
app.use('/', require('./routes'));  //this routes any requests that comes from the browser to the routes folder files

//set up the view engine to ejs
app.set('view engine', 'ejs');
//set the path of views folder
app.set('views', './views');

//starting a server
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);  //interpolation
        return;
    }
    console.log(`Server is running on port : ${port}`);
});