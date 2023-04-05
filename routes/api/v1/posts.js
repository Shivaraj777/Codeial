//import express module
const express = require('express');
//aquiring the router from express to route the requests
const router = express.Router();
//importing the posts_api controller
const postsApi = require('../../../controllers/api/v1/posts_api');
//importing the passport module
const passport = require('passport');

//route the request to the index action of posts_api controller in ap1/v1 folder
router.get('/', postsApi.index);
//route the request to the destroy action of posts_api controller in ap1/v1 folder
router.delete('/:id', passport.authenticate('jwt', {session: false}), postsApi.destroy);    //passport.authenticate('jwt', {session: false}) -> authenticate the user using jwt strategy and do not create a session

//exporting the router so that it can be used in other files
module.exports = router;