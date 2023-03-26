//Description: this file is use to route the requests to comments controller

//import express module
const express = require('express');
//aquiring the router from express to route the requests
const router = express.Router();
//importing the posts_controller
const commentsController = require('../controllers/comments_controller');
//importing the passport module
const passport = require('passport');

//routing the requests to the create action in comments_controller
router.post('/create', passport.checkAuthentication, commentsController.create);
//routing the requests to the destroy action in comments_controller
router.get('/destroy/:id', passport.checkAuthentication, commentsController.destroy);  //:id is a dynamic parameter

//exporting the router
module.exports = router;