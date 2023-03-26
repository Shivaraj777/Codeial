//Description: this file is used to route the requests to the users controller

const express = require('express');
const router = express.Router();

//importing the users controller
const usersController = require('../controllers/users_controller');
//import the passport module
const passport = require('passport');

//routing the request to profile action in users controller if user is authenticated
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
//routing the request to sign-up action in users controller
router.get('/sign-up', usersController.signUp);
//routing the request to sign-in action in users controller
router.get('/sign-in', usersController.signIn);
//routing the request to create action in users controller
router.post('/create', usersController.create);
//routing the request to create-session action in users controller(use passport as a middleware to authenticate)
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);
//routing the request to destroy-session action in users controller
router.get('/sign-out', usersController.destroySession);

//exporting the router so that it can be used in other files
module.exports = router;