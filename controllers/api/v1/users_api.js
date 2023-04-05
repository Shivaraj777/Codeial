//Description: This file contains the code for the Users API

//importing the User model
const User = require('../../../models/user');
//importing the jsonwebtoken module
const jwt = require('jsonwebtoken');

//sign in and create a session for the user
module.exports.createSession = async function(req, res){
    try{
        //find the user
        let user = await User.findOne({email: req.body.email}); 

        //if the user is not found or the password is incorrect
        if(!user || user.password != req.body.password){
            return res.status(422).json({
                message: 'Invalid username/password'
            });
        }

        //if the user is found
        return res.status(200).json({
            message: 'Sign in successful, here is your token, please keep it safe!',
            data: {
                token: jwt.sign(user.toJSON(), 'codeial', {expiresIn: '100000'})
            }
        });
    }catch{
        console.log('******', err);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}