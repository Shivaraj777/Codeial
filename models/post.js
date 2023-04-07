//Description: this file contains the schema for post collection

//require the mongoose module
const mongoose = require('mongoose');

//create a new schema for post collection
const postSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    user:{  //this is used to add the reference to the user who created the post
        type: mongoose.Schema.Types.ObjectId,   //maping the unique user id to the post
        ref: 'User'                             //referring to the user collection
    },
    comments: [     //include the array of ids of all the comments in this post schema itself(to make it easier to access the comments of a post)
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    likes: [    //include the array of ids of all the likes in this post schema itself(to make it easier to access the likes of a post)
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
}, {
    timestamps: true   //this will automatically add createdAt and updatedAt fields to the schema
});

//create a model for post collection
const Post = mongoose.model('Post', postSchema);

//export the module
module.exports = Post;