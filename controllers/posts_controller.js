//Description: this file contains all the action related to posts

//require the Post model
const Post = require('../models/post');
const Comment = require('../models/comment');

//action to create a post
// module.exports.create = function(req, res){
//     Post.create({
//         content: req.body.content,
//         user: req.user._id  //req.user is the current signed in user from the passport
//     })
//         .then(post => {
//             //if the request is an AJAX request
//             if(req.xhr){
//                 //return the post in json format
//                 return res.status(200).json({   
//                     data: {
//                         post: post
//                     },
//                     message: "Post created!"
//                 });
//             }
//             req.flash('success', 'Post published!');
//             return res.redirect('back');
//         })
//         .catch(err => {
//             console.log(`Error in creating post: ${err}`);
//             req.flash('error', err);
//             return res.redirect('back');
//         });
// }

//action to create a post using async-await
module.exports.create = async function(req, res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        
        //if the request is an AJAX request
        if (req.xhr){
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            post = await post.populate({
                path: 'user',
                select: 'name'
            });

            //return the post in json format
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }

        req.flash('success', 'Post published!');
        return res.redirect('back');

    }catch(err){
        req.flash('error', err);
        // added this to view the error on console as well
        console.log('Error', err);
        return res.redirect('back');
    }
}

//action to delete a post
// module.exports.destroy = function(req, res){
//     //find the post
//     // console.log(req.params.id)
//     Post.findById(req.params.id)
//         .then(post => {
//             //if the post belongs to the user(only the user who created the post can delete it)
//             if(post.user == req.user.id){   //.id means converting the object id into string
//                 post.deleteOne();  //remove the post
//                 Comment.deleteMany({post: req.params.id})   //delete all the comments associated with the post
//                     .then(comment => {
//                         return res.redirect('back');
//                     })
//                     .catch(err => {
//                         console.log(`Error in deleting comments: ${err}`);
//                         return;
//                     });
//             }else{  //if the post does not belong to the user
//                 return res.redirect('back');
//             }
//         })
//         .catch(err => {
//             console.log(`Error in deleting post: ${err}`);
//             return;
//         });
// }

//action to delete a post using async-await
module.exports.destroy = async function(req, res){
    try{
        //find the post
        let post = await Post.findById(req.params.id);

        //if the post belongs to the user(only the user who created the post can delete it)
        if (post.user == req.user.id){
            post.deleteOne();  //delete the post

            //delete all the comments associated with the post
            await Comment.deleteMany({post: req.params.id});

            //if the request is an AJAX request
            if(req.xhr){
                //return the post in json format
                return res.status(200).json({   
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted!"
                });
            }

            req.flash('success', 'Post and associated comments deleted!');
            return res.redirect('back');
        }else{
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error', err);
        req.flash('error', err);
        return;
    } 
}