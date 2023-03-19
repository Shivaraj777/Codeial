// Description: Home controller page contains a list of actions responsible for rendering home page

//exporting the home action
module.exports.home = function(req, res){
    console.log(req.cookies); //for reading/printing the cookies in console
    res.cookie('user_id', 25); //used for writing into/modifying the cookies
    return res.render('home', {
        title: "Codeial Home"
    });
}