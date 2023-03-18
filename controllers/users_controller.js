// Description: Users controller page contains a list of actions responsible for rendering user profile page

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