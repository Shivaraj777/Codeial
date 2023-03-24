//Description: this file contains all the action related to posts

//require the Post model
const Post = require('../models/post');

module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id  //req.user is the current signed in user from the passport
    })
        .then(post => {
            return res.redirect('back');
        })
        .catch(err => {
            console.log(`Error in creating post: ${err}`);
            return;
        });
}