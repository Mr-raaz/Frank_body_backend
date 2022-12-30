const user = require("../models/user.model")
 const bscrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// async function userManualLogin({email, password}){
//     const alldata = await user.find({email,logintype:"email-password"}).select('name email password').lean();

//     console.log( alldata, email, password);
//     if(!alldata){
//         return "User not found with this email"
//     }
//     let samepass = false;
//     console.log(typeof password, typeof alldata[0].password)
//     // let hashpass = bscrypt.hash(password);
//     // console.log(hashpass, "hashpassval");
//     // if(hashpass + "" === ""+JSON.parse(JSON.stringify(alldata[0].password))){
//     //     console.log("condition passed");
//     //     samepass = true;
//     // }
//       let passwordMatch = await  bscrypt.compare(password,alldata[0].password);
//       console.log(passwordMatch, "hello");
//      if(passwordMatch){
//         console.log("same pass is "+ password, alldata[0].password);
//         const token = generateToken(alldata);
//         return token;
//      }else {
//          return "password is incorrent"
//      }
//     //  return alldata;

//     // write the logic that will check email and password are correct or not then return boolean
// }
const generateToken = (value)=>{
    // console.log("generating token");
    if(value.password){
       delete value.password
    }
    try{
        const tokenvalue = jwt.sign(JSON.stringify(value), "secretkey");
        //  console.log(tokenvalue);
         return tokenvalue;
    }catch(err){
        // console.log(err);
        throw new Error(err);
    }
    
}

module.exports = generateToken
