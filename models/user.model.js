const mongoose = require("mongoose");

const userModel = new mongoose.Schema({

})




const user = mongoose.model('users' , userModel);

module.exports = user;