//import express module
const express = require('express');
//aquiring the router from express to route the requests
const router = express.Router();

//routing the request to the index.js file in v1 folder
router.use('/v1', require('./v1'));

module.exports = router;