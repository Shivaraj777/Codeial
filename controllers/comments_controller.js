//Description: this file contains the actions for the comments

//require the comment model
const Comment = require('../models/comment');
//require the post model
const Post = require('../models/post');
//require the Like model
const Like = require('../models/like');
//require the comments_mailer module
const commentsMailer = require('../mailers/comments_mailer');
//require the queue module
const queue = require('../config/kue');  //create a queue
//require the commentEmailWorker module
const commentsEmailWorker = require('../workers/comment_email_worker'); 

//create a new comment
// module.exports.create = function(req, res){
//     //find the post in which the comment is to be made
//     Post.findById(req.body.post)
//         .then(post => {
//             //if the post is found
//             if(post){
//                 //create a new comment
//                 Comment.create({
//                     content: req.body.content,
//                     user: req.user._id,
//                     post: req.body.post
//                 })
//                     .then(comment => {
//                         //push the comment id to the comments array of the post schema
//                         post.comments.push(comment);
//                         post.save();    //save the post
//                         res.redirect('back');  //redirect to the same page
//                     })
//                     .catch(err => {
//                         console.log('Error in creating a comment', err);
//                         return;
//                     });
//             }
//         })
//         .catch(err => {
//             console.log('Error in finding the post in which the comment is to be made', err);
//             return;
//         });
// }

//action to create a new comment using async-await
module.exports.create = async function(req, res){
    try{
        //find the post in which the comment is to be made
        let post = await Post.findById(req.body.post);

        //if post exists
        if (post){
            //create a new comment
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            //push the comment id to the comments array of the post schema
            post.comments.push(comment);
            post.save();

            // populate the user of each comment
            comment = await comment.populate({
                path: 'user',
                select: 'name email'
            });

            //send the email to the user who made the comment
            // commentsMailer.newComment(comment);

            //create a new job in the queue for sending mails('emails' is the name of the queue, comment is the data that we want to pass to the worker)
            //if queue does not exists, new queue is created and job is added || if queue exists, the job is added to the queue
            let job = queue.create('emails', comment).save(function(err){   //save the job in the queue
                if(err){
                    console.log('Error in creating a queue', err);
                    return;
                }
                console.log('Job enqueued', job.id);  //how can job.id be accessed here? job is defined inside the save function
            });

            //if the request is an AJAX request
            if (req.xhr){
                //return the comment in json format
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Comment added!"
                });
            }

            req.flash('success', 'Comment added!');  //flash message

            //redirect to the same page
            res.redirect('/');
        }
    }catch(err){
        console.log('Error', err);
        req.flash('error', err);
        return;
    } 
}

//delete a comment
// module.exports.destroy = function(req, res){
//     console.log(req.params.id);
//     //find the comment
//     Comment.findById(req.params.id)
//         .then(comment => {
//             //if the comment belongs to the user or the post belongs to the user(user can delete the comment)
//             if(comment.user == req.user.id){
//                 const postId = comment.post;   //store the postId so that we can delete the comment from the comments array of post schema
//                 comment.deleteOne();    //delete the comment
//                 //find the post in which comment is to be deleted
//                 Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}})   //$pull is used to pull/remove the comment from the comments array of post schema
//                     .then(post => {
//                         return res.redirect('back');
//                     })
//                     .catch(err => {
//                         console.log('Error in deleting the comment from the comments array of post schema', err);
//                         return;
//                     });
//             }else{
//                 return res.redirect('back');
//             }
//         })
//         .catch(err => {
//             console.log('Error in finding the comment to be deleted', err);
//             return;
//         });
// }

//action to delete a comment using async-await
module.exports.destroy = async function(req, res){
    try{
        //find the comment to be deleted
        let comment = await Comment.findById(req.params.id);

        //if the comment belongs to the user or the post belongs to the user(user can delete the comment)
        if (comment.user == req.user.id){
            let postId = comment.post;   
            comment.deleteOne();    //delete the comment

            //find the post in which comment is to be deleted and pull the comment Id from the comments array of post schema
            let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

            //destroy the associated likes for this comment
            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});

            //if the request is an AJAX request
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Comment deleted!"
                });
            }

            req.flash('success', 'Comment deleted!');  //flash message

            //redirect to the same page
            return res.redirect('back');
        }else{
            req.flash('error', 'You cannot delete this comment!');  //flash message
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error', err);
        req.flash('error', err);
        return;
    }  
}
