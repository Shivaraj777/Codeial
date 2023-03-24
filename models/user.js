// Description: this file contains the schema for user collection

//require the mongoose module
const mongoose = require('mongoose');

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
    }
}, {
    //this will automatically add createdAt and updatedAt fields to the schema
    timestamps: true
});

//create a model for user collection
const User = mongoose.model('User', userSchema);

//export the module
module.exports = User;