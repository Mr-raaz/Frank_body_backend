const mongoose = require("mongoose");

const userModel = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:Array
    },
    orderhistory:{
        type:Array
    },
    logintype:{
        type:String,
        required:true
    },
    cart:{
        type:Array
    }

})

const user = mongoose.model('users' , userModel);

module.exports = user;