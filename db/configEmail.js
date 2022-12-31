

const nodemailer = require('nodemailer');

// let transporter = nodemailer.createTransport({
//   service:'gmail',
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: `frankbody123@gmail.com`, // generated ethereal user
//       pass: 'znnuxibeatpzxorc', // generated ethereal password
//     },
//   });
let testAccount = async()=>{
  return await nodemailer.createTestAccount();
}


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: testAccount.user, // generated ethereal user
    pass: testAccount.pass, // generated ethereal password
  },
})

module.exports = transporter

// ezvpwyfnbqtdkyek
// frankbody123@gmail.com
// frank@1234

