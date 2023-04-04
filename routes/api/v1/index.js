
//import express module
const express = require('express');
//aquiring the router from express to route the requests
const router = express.Router();

//routing the requests to the posts.js file
router.use('/posts', require('./posts'));

module.exports = router;