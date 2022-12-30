

const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'frankbody123@gmail.com', // generated ethereal user
      pass: 'frank@1234', // generated ethereal password
    },
  });

module.exports = transporter


// frankbody123@gmail.com
// frank@1234