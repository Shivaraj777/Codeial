//Description: This file contains the code for jwt strategy of passport

//import the passport module
const passport = require('passport');
//import the passport-jwt module and extract the JWTStrategy
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;  //used to extract the jwt from the header

//import the user model
const User = require('../models/user');

//setting up the options(configure behaviour) for jwt strategy
let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),  //extract the jwt from the header
    secretOrKey: 'codeial'      //secret key used for decrypting the jwt token
}

//tell passport to use the jwt strategy
passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){
    //find the user
    User.findById(jwtPayLoad._id)
        .then(user => {
            //if user is found
            if(user){
                return done(null, user);  //null -> no error, user -> authentication success
            }else{
                return done(null, false);  //null -> no error, false -> autentication failed
            }
        })
        .catch(err => {
            console.log(`Error in finding user --> Passport`);
            return done(err);
        });
}));

//export the passport module
module.exports = passport;

