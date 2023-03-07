//Description: this file contains all the routes of the application and is a central point or entry point for all the routes

//import express module
const express = require('express');
//aquiring the router from express to route the requests
const router = express.Router();
//importing the home_controller
const homeController = require('../controllers/home_controller');

console.log('Router loaded');

//routing the requests
router.get('/', homeController.home);

//exporting the router so that it can be used in other files
module.exports = router;