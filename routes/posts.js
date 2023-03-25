//Description: this file is use to route the requests to Post controller

//import express module
const express = require('express');
//aquiring the router from express to route the requests
const router = express.Router();
//importing the posts_controller
const postsController = require('../controllers/posts_controller');
//importing the passport module
const passport = require('passport');

//routing the requests to the create action in posts_controller
router.post('/create', passport.checkAuthentication, postsController.create);

//exporting the router
module.exports = router;