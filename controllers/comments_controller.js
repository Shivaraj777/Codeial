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

//delete a comment
module.exports.destroy = function(req, res){
    console.log(req.params.id);
    //find the comment
    Comment.findById(req.params.id)
        .then(comment => {
            //if the comment belongs to the user or the post belongs to the user(user can delete the comment)
            if(comment.user == req.user.id){
                const postId = comment.post;   //store the postId so that we can delete the comment from the comments array of post schema
                comment.deleteOne();    //delete the comment
                //find the post in which comment is to be deleted
                Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}})   //$pull is used to pull/remove the comment from the comments array of post schema
                    .then(post => {
                        return res.redirect('back');
                    })
                    .catch(err => {
                        console.log('Error in deleting the comment from the comments array of post schema', err);
                        return;
                    });
            }else{
                return res.redirect('back');
            }
        })
        .catch(err => {
            console.log('Error in finding the comment to be deleted', err);
            return;
        });
}
