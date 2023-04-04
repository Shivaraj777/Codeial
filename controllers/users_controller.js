// Description: Users controller page contains a list of actions responsible for rendering user profile page

//importing the User model
const User = require('../models/user');
//importing the fs module
const fs = require('fs');
//importing the path module
const path = require('path');

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
// module.exports.update = function(req, res){
//     //check if the user is authenticated(only the current user can update his/her profile)
//     if(req.user.id == req.params.id){
//         //if the user is authenticated, update the user
//         User.findByIdAndUpdate(req.params.id, req.body)
//             .then(user => {
//                 req.flash('success', 'Profile updated!');  //flash message
//                 return res.redirect('back');
//             })
//             .catch(err => {
//                 console.log(`Error in updating the user: ${err}`);
//                 req.flash('error', err);    //flash message
//                 return;
//             });
//     }else{     //if the user is not authenticated, redirect to the sign-in page
//         return res.status(401).send('Unauthorized');
//     }
// }

//action to update the user profile using async-await and multer
module.exports.update = async function(req, res){
    //check if the user is authenticated(only the current user can update his/her profile)
    if(req.user.id == req.params.id){
        try{
            //find the user by id
            let user = await User.findById(req.params.id);

            //multer function to upload the file and update the user
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log(`******Multer error: ${err}`);
                }
                // console.log(req.file);
                //update the user with the new data
                user.name = req.body.name;
                user.email = req.body.email;

                //check if path of avatar is already present in the user
                if(user.avatar){
                    //if the user has already uploaded a file, delete the previous file(existsSync() checks if the file exists or not
                    if(fs.existsSync(path.join(__dirname, '..', user.avatar))){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));     //unlinkSync() is used to delete the file
                    }
                }

                //if the user has uploaded a file
                if(req.file){
                    //this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }

                user.save();
                return res.redirect('back');
            });
        }catch{
            console.log(`Error in updating the user: ${err}`);
            req.flash('error', err);
            return;
        }
    }else{  //if the user is not authenticated, redirect to the sign-in page
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
    //check if the password and confirm password match
    if(req.body.password != req.body.confirm_password){
        req.flash('error', 'Passwords do not match');  //flash message
        return res.redirect('back');
    }
    //check if the user already exists
    User.findOne({email: req.body.email})
        .then(user => {
            if(!user){
                //if the user does not exist, create the user
                User.create(req.body)
                    .then(user => {
                        req.flash('success', 'Signed up successfully');  //flash message
                        return res.redirect('/users/sign-in');
                    })
                    .catch(err => {
                        console.log(`Error in creating user while signing up: ${err}`);
                        req.flash('error', err);    //flash message
                        return;
                    });
            }else{
                //if user already exists, redirect to sign-in page
                req.flash('error', 'User already exists, please login to continue!');  //flash message
                return res.redirect('back');
            }
        })
        .catch(err => {
            console.log(`Error in finding the user while signing up: ${err}`);
            req.flash('error', err);    //flash message
            return;
        });
}

//sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in successfully');   //flash message
    return res.redirect('/');
}

//sign out and destroy the session
module.exports.destroySession = function(req, res){
    //passport has a method req.logout() which destroys the session
    req.logout(err => {
        if(err){
            return next(err);
        }
        req.flash('success', 'You have logged out!');  //flash message
        return res.redirect('/');
    });
}