// Description: Users controller page contains a list of actions responsible for rendering user profile page

//importing the User model
const User = require('../models/user');

//action to display the profile page of the users(by checking the id in the url)
module.exports.profile = function(req, res){
    //find the user by id and render the profile page
    User.findById(req.params.id)
        .then(user => {
            return res.render('user_profile', {
                title: 'User Profile',
                profile_user: user            //passing the user object to the view(user_profile.ejs)
            });
        })
        .catch(err => {
            console.log(`Error in finding the user: ${err}`);
            return;
        })
}

//action to update the user profile
module.exports.update = function(req, res){
    //check if the user is authenticated(only the current user can update his/her profile)
    if(req.user.id == req.params.id){
        //if the user is authenticated, update the user
        User.findByIdAndUpdate(req.params.id, req.body)
            .then(user => {
                return res.redirect('back');
            })
            .catch(err => {
                console.log(`Error in updating the user: ${err}`);
                return;
            });
    }else{     //if the user is not authenticated, redirect to the sign-in page
        return res.status(401).send('Unauthorized');
    }
}

//exporting the sign-up action to render the sign-up page
module.exports.signUp = function(req, res){
    //if the user is already signed in, redirect to profile page
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: 'Codeial | Sign-Up'
    });
}

//exporting the sign-in action to render the sign-in page
module.exports.signIn = function(req, res){
    //if the user is already signed in, redirect to profile page
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

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
    return res.redirect('/');
}

//sign out and destroy the session
module.exports.destroySession = function(req, res){
    //passport has a method req.logout() which destroys the session
    req.logout(err => {
        if(err){
            return next(err);
        }
        return res.redirect('/');
    });
}