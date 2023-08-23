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
//importing the passport-jwt-strategy module
const passportJWT = require('./config/passport-jwt-strategy');
//importing the passport-google-oauth2-strategy module
const passportGoogle = require('./config/passport-google-oauth2-strategy');
//importing the connect-mongo module
const MongoStore = require('connect-mongo'); //session is passed as an argument as it is used to store the session information in the database
//import the sass middleware
const sass = require('node-sass');
const sassMiddleware = require('node-sass-middleware');
//import the flash module
const flash = require('connect-flash'); //used for displaying the flash messages
//import the custom middleware
const customMware = require('./config/middleware');
//import the environtment module from configs
const env = require('./config/environment');
// import morgan varibale for logging
const logger = require('morgan');
//import the path module
const path = require('path');

// {set up the chat server to be used with socket.io}
//import the chat server module and pass the express app to it
const chatServer = require('http').Server(app);  //this is used to create a server for the chat
//import the chat sockets module and pass the chat server to it
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);   //this is used to set up the chat server configuration
//set the port for the chat server
chatServer.listen(3000);
console.log('Chat Server is listening on port 3000');

//middleware to conver scss to css
if(env.name === 'development'){
    app.use(sassMiddleware({
        src: path.join(__dirname, env.assets_path, 'scss'),       //path where scss files are present
        dest: path.join(__dirname, env.assets_path, 'css'),       //path where css files are to be stored after conversion
        debug: true,                //if true, it will print the logs in the console
        outputStyle: 'extended',  //output style of the css file
        prefix: '/css'            //prefix for the css files()
    }));
}

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
app.use(express.static(env.assets_path));
//make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

//use morgan logger for logging logs
app.use(logger(env.morgan.mode, env.morgan.options));

//set up the view engine to ejs
app.set('view engine', 'ejs');
//set the path of views folder
app.set('views', './views');

//use express session to maintain the session cookies
app.use(session({
    name: 'codeial', //name of the session cookie
    //TODO change the secret before deployment in production mode
    secret: env.session_cookie_key, //secret key used to encrypt the session cookie
    saveUninitialized: false,  // if the user is not logged in, do not save the session cookie
    resave: false,   //if the session is not modified, do not save it
    cookie: {
        maxAge: (1000 * 60 * 100)  //max time in milliseconds after which the session cookie expires
    },
    store: new MongoStore(
        {
            mongoUrl: 'mongodb://127.0.0.1/codeial_development',  //connecting to the database
            autoRemove: 'disabled'  //do not remove the session from the database even if it expires
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

//use passport to initialize the session
app.use(passport.initialize());
//use passport to maintain the session
app.use(passport.session());

//use passport setAuthenticatedUser middleware to set the user for the views
app.use(passport.setAuthenticatedUser);

//use flash to display the flash messages
app.use(flash());  //this should be used after the session cookie is set
app.use(customMware.setFlash);  //this is used to set the flash messages in the response locals

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