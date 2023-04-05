const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

//api to render/display the posts
module.exports.index = async function(req, res){
    // populate the user of each post
    let posts = await Post.find({})
    .sort('-createdAt')         //sort the posts in descending order of createdAt
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });

    return res.status(200).json({
        message: 'List of posts',
        posts: posts
    })
}

//api to delete the post
module.exports.destroy = async function(req, res){
    try{
        //find the post
        let post = await Post.findById(req.params.id);

        //if the post belongs to the user(only the user who created the post can delete it)
        if (post.user == req.user.id){
            post.deleteOne();  //delete the post

            //delete all the comments associated with the post
            await Comment.deleteMany({post: req.params.id});

            return res.status(200).json({
                message: 'Post and associated comments deleted successfully!'
            });
        }else{
            return res.status(401).json({
                message: 'You cannot delete this post'
            });
        }
    }catch(err){
        console.log(`Error in deleting post: ${err}`);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    } 
}