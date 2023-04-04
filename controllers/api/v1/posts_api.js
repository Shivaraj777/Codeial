//api to render the posts
module.exports.index = function(req, res){
    return res.json(200, {
        message: 'List of posts',
        posts: []
    });
}