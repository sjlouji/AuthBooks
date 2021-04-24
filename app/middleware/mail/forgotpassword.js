const sgMail = require("@sendgrid/mail");
const config  = require('config')
const { templates } = require('books-constants');

sgMail.setApiKey(config.SENDGRIDKEY);

function forgotPassword(data,url) {
   const msg = {
      to: data.email,
      from: 'sjlouji10@gmail.com',
      templateId: templates.password_reset,
      subject: 'Forgot Password Email - AuthBooks',
      dynamic_template_data: {
         user_name: data.first_name,
         url: url
      }
    };
    sgMail.send(msg, (error, result) => {
      if (error) {
          console.log(JSON.stringify(error));
      } else {
        console.log(`Forgot password mail send to ${data.email}`);
    }
    });
}

module.exports = forgotPassword