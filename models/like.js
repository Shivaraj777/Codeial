//Description: This file contains the code for Like Schema

//importing the mongoose
const mongoose = require('mongoose');

//creating the schema
const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,  //this is the id of the user who liked the post or comment
        ref: 'User'
    },
    likeable: {
        //this is the object on which the like is being placed
        type: mongoose.Schema.Types.ObjectId,  //this is the id of the liked object(post/comment)
        required: true,                         
        refPath: 'onModel'     //defines on which model the like is being placed dynamically(post/comment)
    },
    onModel: {
        //this field is used for defining the type of the liked object since we are using dynamic reference
        type: String,
        required: true,
        enum: ['Post', 'Comment']    //defines the values that can be stored in onModel(onModel can take only these two values)
    }
}, {
    timestamps: true
});

//creating the model
const Like = mongoose.model('Like', likeSchema);

//exporting the model
module.exports = Like;