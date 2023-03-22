//Description: This file contains the code for the local strategy of passport

//import the passport module
const passport = require('passport');
//import the passport-local module and extract the LocalStrategy
const LocalStrategy = require('passport-local').Strategy;
//import the user model
const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({    //tell passport to use this local startegy for authentication(below code is the strategy for authentication)
        //defining the fields to be used for authentication
        usernameField: 'email',
    },
    function(email, password, done){   //done is a callback function which handles whether the authentication success and failure
        //find a user and establish the identity
        User.findOne({email: email})
            .then(user => {
                //if user not found or password does not match
                if(!user || user.password != password){
                    console.log(`Invalid Username/Password`);
                    return done(null, false);  //null -> no error, false -> autentication failed
                }
                //if user is found and password matches we return the user
                return done(null, user);    //null -> no error, user -> authentication success
            })
            .catch(err => {         //if there is an error in finding the user
                console.log(`Error in finding user --> Passport`);
                return done(err);
            });
    }
));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    //setting the user id as key in the cookies
    done(null, user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    //finding the user using the id
    User.findById(id)
        .then(user => {
            //if user found
            if(user){
                return done(null, user);
            }
            //if user not found
            return done(null, false);
        })
        .catch(err => {
            console.log(`Error in finding user --> Passport`);
            return done(err);
        });
});

//check if the user is authenticated(creaing a middleware)
passport.checkAuthentication = function(req, res, next){
    //if the user is signed in, then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signed in
    return res.redirect('/users/sign-in');
}

//sending the user details to the views(creating a middleware)
passport.setAuthenticatedUser = function(req, res, next){
    //if the user is signed in
    if(req.isAuthenticated()){
        //req.user contains the current signed in user details from the session cookie and we are just sending this to the locals(response) for the views
        res.locals.user = req.user;
    }
    next();
}

//exporting the passport module
module.exports = passport;