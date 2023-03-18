// Description: Users controller page contains a list of actions responsible for rendering user profile page

//exporting the profile action
module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    });
}