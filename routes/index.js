//Description: this file contains all the routes of the application and is a central point or entry point for all the routes

//import express module
const express = require('express');
//aquiring the router from express to route the requests
const router = express.Router();
//importing the home_controller
const homeController = require('../controllers/home_controller');

console.log('Router loaded');

//routing the requests
router.get('/', homeController.home);    //this route handles the home page requests and routes it to home controller
router.use('/users', require('./users')); //if any request comes from /users page then this code will require the users.js file and route the request to users controller

//for any further routes, access from here
//router.use('/routerName', require('./routerFile'));

//exporting the router so that it can be used in other files
module.exports = router;