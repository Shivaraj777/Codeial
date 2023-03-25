//Description: this file contains the actions for the comments

//require the comment model
const Comment = require('../models/comment');
//require the post model
const Post = require('../models/post');

//create a new comment
module.exports.create = function(req, res){
    //find the post in which the comment is to be made
    Post.findById(req.body.post)
        .then(post => {
            //if the post is found
            if(post){
                //create a new comment
                Comment.create({
                    content: req.body.content,
                    user: req.user._id,
                    post: req.body.post
                })
                    .then(comment => {
                        //push the comment id to the comments array of the post schema
                        post.comments.push(comment);
                        post.save();    //save the post
                        res.redirect('back');  //redirect to the same page
                    })
                    .catch(err => {
                        console.log('Error in creating a comment', err);
                        return;
                    });
            }
        })
        .catch(err => {
            console.log('Error in finding the post in which the comment is to be made', err);
            return;
        });
}
