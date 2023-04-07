//Description: This file contains the actions for the likes controller

//importing the Like model
const Like = require('../models/like');
//importing the Post model
const Post = require('../models/post');
//importing the Comment model
const Comment = require('../models/comment');

//creating the toggleLike action
module.exports.toggleLike = async function(req, res){
    try{
        let likeable;  //this variable will store the liked object
        let deleted = false;   //this variable will store the status of the like(whether it is deleted or not)

        //query: likes/toggle/?id=abc&type=Post

        //finding the liked object
        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Post.findById(req.query.id).populate('likes');
        }

        //check if like already exists
        let existingLike = await Like.findOne({
            user: req.user._id,
            likeable: req.query.id,
            onModel: req.query.type
        });

        //if like already exists for a user then delete it
        if(existingLike){
            //remove the like from the likes array of the liked object
            likeable.likes.pull(existingLike._id);
            likeable.save();

            //delete the like from the likes collection
            existingLike.deleteOne();
            deleted = true;
        }else{
            //else create a new like
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });

            //push the like into the likes array of the liked object
            likeable.likes.push(newLike._id);
            likeable.save();
        }

        //return the response
        return res.status(200).json({
            message: 'Request Successfull',
            data: {
                deleted: deleted   //return the status of the like whether it is deleted or not to the user
            }
        });
    }catch{
        console.log(`Error in toggling like: ${err}`);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}