//Description: This file contains the configuration for interacting with the mailtrap service using nodemailer

//importing the nodemailer module
const nodemailer = require('nodemailer');
//importing the ejs module
const ejs = require('ejs');


//defining the transporter for sending emails(defines how the communication will take place)
let transporter = nodemailer.createTransport({
    service: 'gmail',                //service to be used for sending emails
    host: 'smtp.gmail.com',         //domain used by developers to interact with service    
    port: 587,
    secure: true,  
    auth: {         
        user: 'codeslayer09876@gmail.com',
        pass: 'fxptgdmefqyvnkwo'
    }
});

//rendering the html template for the mail
let renderTemplate = (data, relativePath) => {
    let mailHTML;      //variable to store the html template
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),    //path of the html template, relativePath->path where this function is called
        data,                                                     //data to be passed to the html template
        function(err, template){
            if(err){
                console.log('Error in rendering template');
                return;
            }
            //if no error then store the html template in the mailHTML variable
            mailHTML = template;
        }
    )
    return mailHTML;
}

//exporting the transporter and renderTemplate
module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}
