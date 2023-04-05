//import express module
const express = require('express');
//aquiring the router from express to route the requests
const router = express.Router();
//importing the users_api module
const usersApi = require('../../../controllers/api/v1/users_api');

//routing the requests to the createSession api in users_api.js file
router.post('/create-session', usersApi.createSession);

module.exports = router;