require('dotenv').config()
const mongoose = require("mongoose");
const testdb = "mongodb+srv://frankbodytest:frankbodytest@cluster0.xqjwgpw.mongodb.net/?retryWrites=true&w=majority";

async function connect(){

    return new Promise((resolve , reject) =>{
        mongoose.connect(testdb , (err)=>{
            if(err){
                reject(err);
            }

            resolve();
        })
    })
}



module.exports = connect;