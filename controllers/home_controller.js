// Description: Home controller page contains a list of actions responsible for rendering home page

//import the Post model
const Post = require('../models/post');

//exporting the home action
module.exports.home = function(req, res){
    // console.log(req.cookies); //for reading/printing the cookies in console
    // res.cookie('user_id', 25); //used for writing into/modifying the cookies

    // Post.find({})   //find all the posts in the DB
    //     .then(posts => {
    //         return res.render('home', {
    //             title: "Codeial | Home",
    //             posts: posts
    //         });
    //     })
    //     .catch(err => {
    //         console.log(`Error in fetching posts from DB: ${err}`);
    //         return;
    //     });

    //find all the post and populate the user of each post
    Post.find({})
    .populate('user')           //populate('user') => populate the user of each post
    .populate({                 //populate the comments of each post and populate the user of each comment(This methos id called nested/deep population)
        path: 'comments',       
        populate: {             
            path: 'user'
        }
    })
    .exec()   //populate('user') => populate the user of each post
        .then(posts => {
            return res.render('home', {
                title: "Codeial | Home",
                posts: posts
            });
        })
        .catch(err => {
            console.log(`Error in fetching posts from DB: ${err}`);
            return;
        });
}