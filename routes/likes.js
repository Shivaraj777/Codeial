//Description: This file contains the code to route the requests to the likes controller

//importing the express router
const express = require('express');
//creating the router
const router = express.Router();
//importing the likes controller
const likesController = require('../controllers/likes_controller');

router.post('/toggle', likesController.toggleLike);

//exporting the router
module.exports = router;