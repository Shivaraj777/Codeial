//Description: this file contains the configuration setup for environment in which app runs

const fs = require('fs'); //import the file system module for reading and writing into a file
const rfs = require('rotating-file-stream'); //import rotating file system module for handling log file limit
const path = require('path'); //import path module

// set the directory for logs
const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory); //if log directory does not exists then create it

// handle log rotation by creating new log files every day in the specified directory (access.log -> log file name)
const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',      //interval to create a new log file
    path: logDirectory  //path where logs will be stored
});

//setup development environment
const development = {
    name: 'development',
    assets_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',                //service to be used for sending emails
        host: 'smtp.gmail.com',         //domain used by developers to interact with service    
        port: 587,
        secure: true,  
        auth: {         
            user: process.env.CODEIAL_GMAIL_USERNAME,   //use env variable just to not make it appear on GIT
            pass: process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
    google_client_ID: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_callback_URL: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret_key: 'codeial',
    morgan: {  //logger configuration to use accessLogStream(rfs)
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}

// setup the production environment
const production = {
    name: 'production',
    assets_path: process.env.CODEIAL_ASSETS_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',                //service to be used for sending emails
        host: 'smtp.gmail.com',         //domain used by developers to interact with service    
        port: 587,
        secure: true,  
        auth: {         
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
    google_client_ID: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_callback_URL: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret_key: process.env.CODEIAL_JWT_SECRET_KEY,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}

module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);