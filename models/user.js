// Description: this file contains the schema for user collection

//require the mongoose module
const mongoose = require('mongoose');
//import the multer module for file uploads
const multer = require('multer');
//import the path module for file path
const path = require('path');

//define the path for storing the uploaded files
const AVATAR_PATH = path.join('/uploads/users/avatars');

//create a new schema for user collection
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    avatar:{
        type: String
    }
}, {
    //this will automatically add createdAt and updatedAt fields to the schema
    timestamps: true
});

// create a multer storage for storing the uploaded files(handling the file uploads)
let storage = multer.diskStorage({
    destination: function(req, res, cb){
        cb(null, path.join(__dirname, '..', AVATAR_PATH));   //path.join(__dirname, '..', AVATAR_PATH) will give the absolute path of the uploads folder
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now());   //function to generate file name with timestamp(epoc), fieldname is the name of the file input field
    }
});

//static methods
userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');  //single('avatar') means that only one file will be uploaded with the name avatar
userSchema.statics.avatarPath = AVATAR_PATH;                                      //static method to access the avatar path

//create a model for user collection
const User = mongoose.model('User', userSchema);

//export the module
module.exports = User;