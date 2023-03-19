// Description: Users controller page contains a list of actions responsible for rendering user profile page

//importing the User model
const User = require('../models/user');

//exporting the profile action
module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    });
}

//exporting the sign-up action to render the sign-up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: 'Codeial | Sign-Up'
    });
}

//exporting the sign-in action to render the sign-in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: 'Codeial | Sign-In'
    });
}

//get the sign-up data
module.exports.create = function(req, res){
    //chec if the password and confirm password match
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    //check if the user already exists
    User.findOne({email: req.body.email})
        .then(user => {
            if(!user){
                //if the user does not exist, create the user
                User.create(req.body)
                    .then(user => {
                        return res.redirect('/users/sign-in');
                    })
                    .catch(err => {
                        console.log(`Error in creating user while signing up: ${err}`);
                        return;
                    });
            }else{
                //if user already exists, redirect to sign-in page
                return res.redirect('back');
            }
        })
        .catch(err => {
            console.log(`Error in finding the user while signing up: ${err}`);
            return;
        });
}

//sign in and create a session for the user
module.exports.createSession = function(req, res){

}