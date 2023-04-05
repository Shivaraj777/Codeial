
//import express module
const express = require('express');
//aquiring the router from express to route the requests
const router = express.Router();

//routing the requests to the posts.js file
router.use('/posts', require('./posts'));
//routing the requests to the pusers.js file
router.use('/users', require('./users'));

module.exports = router;