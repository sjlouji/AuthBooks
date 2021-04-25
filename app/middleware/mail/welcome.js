const sgMail = require("@sendgrid/mail");
const config  = require('config');
const { templates } = require('books-constants');

sgMail.setApiKey(config.SENDGRIDKEY);

function welcomeEmail(data) {
   const msg = {
      to: data.email,
      from: 'sjlouji10@gmail.com',
      templateId: templates.confirm_account,
      dynamic_template_data: {
         user_name: data.first_name,
      }
    };
    sgMail.send(msg, (error, result) => {
      if (error) {
          console.log(JSON.stringify(error));
      } else {
          console.log(`Welcome mail send to ${data.email}`);
      }
    });
}

module.exports = welcomeEmail