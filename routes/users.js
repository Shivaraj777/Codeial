//Description: this file is used to route the requests to the users controller

const express = require('express');
const router = express.Router();

//importing the users controller
const usersController = require('../controllers/users_controller');

//routing the request
router.get('/profile', usersController.profile);

//exporting the router so that it can be used in other files
module.exports = router;