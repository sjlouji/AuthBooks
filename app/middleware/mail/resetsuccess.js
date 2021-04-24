const sgMail = require("@sendgrid/mail");
const config  = require('config')
const { templates } = require('books-constants')

sgMail.setApiKey(config.SENDGRIDKEY);

function resetSuccess(data,email) {
   const msg = {
      to: email,
      from: 'sjlouji10@gmail.com',
      templateId: templates.password_reset_confirm,
      dynamic_template_data: {
         user_name: data,
      }
    };
    sgMail.send(msg, (error, result) => {
      if (error) {
          console.log(JSON.stringify(error));
      } else {
        console.log(`Forgot password Success mail send to ${email}`);
    }
    });
}
module.exports = resetSuccess