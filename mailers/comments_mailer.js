//Description: This file contains the code for sending emails to the user when a comment is made/deleted on a post

//importing the nodemailer module
const nodemailer = require('../config/nodemailer');

//this is another way of exporting a method
exports.newComment = (comment) => {         //function to send the mail to the user who made the comment 
    console.log('Inside newComment mailer');
    //rendering the html template for the mail
    let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');
    //sending the mail
    nodemailer.transporter.sendMail({
        from: 'codeslayer09876@gmail.com',
        to: comment.user.email,
        subject: 'New comment added!',
        html: htmlString
    },
    (err, info) => {    //callback function
        if(err){
            console.log('Error in sending mail', err);
            return;
        }
        console.log('Mail sent successfully', info);      //info contains the information about the message sent
        return;
    });
}