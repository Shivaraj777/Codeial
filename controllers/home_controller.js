// Description: Home controller page contains a list of actions responsible for rendering home page

//import the Post model
const Post = require('../models/post');
//import the User model
const User = require('../models/user');

//home action for rendering the home page
// module.exports.home = function(req, res){
//     // console.log(req.cookies); //for reading/printing the cookies in console
//     // res.cookie('user_id', 25); //used for writing into/modifying the cookies

//     //find all the post and populate the user of each post
//     Post.find({})
//     .populate('user')           //populate('user') => populate the user of each post
//     .populate({                 //populate the comments of each post and populate the user of each comment(This methos id called nested/deep population)
//         path: 'comments',       
//         populate: {             
//             path: 'user'
//         }
//     })
//     .exec()   
//         .then(posts => {
//             User.find({})
//                 .then(users => {
//                     return res.render('home', {
//                         title: "Codeial | Home",
//                         posts: posts,
//                         all_users: users
//                     });
//                 })
//                 .catch(err => {
//                     console.log(`Error in fetching users from DB: ${err}`);
//                     return;
//                 });
//         })
//         .catch(err => {
//             console.log(`Error in fetching posts from DB: ${err}`);
//             return;
//         });
// }

//render the home page using async-await
module.exports.home = async function(req, res){
    //try-catch block is used to handle the errors
    try{
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

        //find all the users
        let users = await User.find({});

        //render the home page
        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts,
            all_users: users
        });

    }catch(err){    //if any error occurs then it will be handled here
        console.log('Error', err);
        return;
    }
}