require('dotenv').config()
const mongoose = require("mongoose");

// console.log(process.env.DB);
async function connect(){

    return new Promise((resolve , reject) =>{
        mongoose.connect(process.env.DB , (err)=>{
            if(err){
                reject(err);
            }

            resolve();
        })
    })
}



module.exports = connect;