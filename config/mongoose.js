//Description: this file is used to connect to the database using mongoose

//require the mongoose module
const mongoose = require('mongoose');
//require the environment module
const env = require('./environment');

//connect to mongodb database with the help of mongoose || also create a database named codeial_development
mongoose.connect(`mongodb://127.0.0.1/${env.db}`);

//establish the connection to the database
const db = mongoose.connection;

//if error occurs while connecting to database
db.on('error', console.error.bind(console, 'Error connecting to MongoDB'));

//if connection is successful
db.once('open', function(){
    console.log("Successfully connected to the database");
});

//export the module
module.exports = db;