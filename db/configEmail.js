

const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: `frankbody123@gmail.com`, // generated ethereal user
      pass: 'zkvxlhwbrvyhxmvr', // generated ethereal password
    },
  });

module.exports = transporter

// ezvpwyfnbqtdkyek
// frankbody123@gmail.com
// frank@1234

// http://localhost:3000/user/reset/
// 63af2dfa5dddeeef5142cb74
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2M2FmMmRmYTVkZGRlZWVmNTE0MmNiNzQiLCJpYXQiOjE2NzI0MjY0NTQsImV4cCI6MTY3MjQyNzM1NH0.-9gO04kkCqiBC63e0siMT7zqqc6-0qbzQ_GEZOUnctg