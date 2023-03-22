//importing express module
const express = require('express');
const app = express();
const port = 8000;
//importing the mongoose module
const db = require('./config/mongoose');
//importing the express layouts module
const expressLayouts = require('express-ejs-layouts');
//importing teh cookie-parser module
const cookieParser = require('cookie-parser'); //used for reading and writing into cookies
//used for session cookie
//importing the express-session module
const session = require('express-session');  //used for creating sessions
//importing the passport module
const passport = require('passport');
//importing the passport-local-strategy module
const passportLocal = require('./config/passport-local-strategy');

//middleware to parse the form data
app.use(express.urlencoded({extended: true})); //this is used to read the form data

//middleware to parse the cookies
app.use(cookieParser());

//use express Layouts
app.use(expressLayouts); 
//extract style and scripts from the sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//middleware to access the static files in assets folder
app.use(express.static('./assets'));

//set up the view engine to ejs
app.set('view engine', 'ejs');
//set the path of views folder
app.set('views', './views');

//use express session to maintain the session cookies
app.use(session({
    name: 'codeial', //name of the session cookie
    //TODO change the secret before deployment in production mode
    secret: 'blahsomething', //secret key used to encrypt the session cookie
    saveUninitialized: false,  // if the user is not logged in, do not save the session cookie
    resave: false,   //if the session is not modified, do not save it
    cookie: {
        maxAge: (1000 * 60 * 100)  //max time in milliseconds after which the session cookie expires
    }
}));

//use passport to initialize the session
app.use(passport.initialize());
//use passport to maintain the session
app.use(passport.session());

//use passport setAuthenticatedUser middleware to set the user for the views
app.use(passport.setAuthenticatedUser);

//use express router
app.use('/', require('./routes'));  //this routes any requests that comes from the browser to the routes folder files

//starting a server
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);  //interpolation
        return;
    }
    console.log(`Server is running on port : ${port}`);
});