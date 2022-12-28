const user = require("../models/user.model")

async function userManualLogin({email, password}){
    const alldata = await user.find();
    console.log(alldata);
    return alldata;

    // write the logic that will check email and password are correct or not then return boolean
}

module.exports = userManualLogin