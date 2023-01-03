require('dotenv').config()

const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service:'gmail',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: `frankbody123@gmail.com`, // generated ethereal user
      pass: process.env.NODE_MAILER_PASSWORD, // generated ethereal password
    },
  });

// create reusable transporter object using the default SMTP transport


module.exports = transporter
// AHARfrank@123 || AHARfrank123
// ezvpwyfnbqtdkyek
// frankbody123@gmail.com
// frank@1234

