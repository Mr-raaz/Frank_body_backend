require('dotenv').config()
const mongoose = require("mongoose");


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