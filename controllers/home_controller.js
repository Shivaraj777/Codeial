// Description: Home controller page contains a list of actions responsible for rendering home page

//exporting the home action
module.exports.home = function(req, res){
    return res.end('<h1>Express is up for Codeial!</h1>');
}