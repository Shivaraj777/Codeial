//Description: This file contains the schema for the comments

//importing the mongoose library
const mongoose = require('mongoose');

//creating the schema for the comments
const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {     //this is the reference to the user who has made the comment
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post:{      //this is the reference to the post on which the comment is made
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    likes: [    //include the array of ids of all the likes in this post schema itself(to make it easier to access the likes of a post)
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
}, {
    timestamps: true
});

//creating the model for the comments
const Comment = mongoose.model('Comment', commentSchema);

//exporting the model
module.exports = Comment;