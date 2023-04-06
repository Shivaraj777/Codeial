//Description: This file contains the code for the worker which is used to send emails for comments action

//importing the queue
const queue = require('../config/kue');
//importing the commentsMailer
const commentsMailer = require('../mailers/comments_mailer');

//processing the jobs in queue
queue.process('emails', function(job, done){
    console.log('emails worker is processing a job', job.data);  //job.data contains the data that we passed in the create function in the comments_controller.js
    
    //calling the newComment function
    commentsMailer.newComment(job.data);

    //tell the queue that the job is done
    done();
})