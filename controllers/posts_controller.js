//Description: this file contains all the action related to posts

//require the Post model
const Post = require('../models/post');
const Comment = require('../models/comment');

//action to create a post
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
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error', err);
        return;
    } 
}