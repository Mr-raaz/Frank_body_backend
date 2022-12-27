const user = require('../models/user.model');


async function userExist(req,res,next){

    try {
        const reqdata = req.body;
        
        const temp = await user.find({email:{$eq:reqdata.email}}).count();

        if(temp == 0){
            next();
        } else {
            res.status(500).send("User Already Exist");
        }

    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    userExist
}