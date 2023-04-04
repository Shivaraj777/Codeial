//import express module
const express = require('express');
//aquiring the router from express to route the requests
const router = express.Router();
//importing the posts_api controller
const postsApi = require('../../../controllers/api/v1/posts_api');

//route the request to the index action of posts_api controller in ap1/v1 folder
router.get('/', postsApi.index);
//route the request to the destroy action of posts_api controller in ap1/v1 folder
router.delete('/:id', postsApi.destroy);

//exporting the router so that it can be used in other files
module.exports = router;