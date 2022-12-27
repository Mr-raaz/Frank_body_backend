const {Router} = require("express");
const user = require('../models/user.model');
const {userExist} = require('../middlewares/user.middlewars');
const bcrypt = require('bcrypt');
const route = Router();



route.post('/register' , userExist , async (req,res)=>{
   
        try {
            const userdetails = req.body;
            const hashPass = await bcrypt.hash(userdetails.password , 7);
            delete userdetails.password
            userdetails.password = hashPass
            userdetails.logintype = "email-password"
            const temp = await user.create(userdetails);
            res.status(201).send("Registered Successfully");

        } catch (error) {
            res.status(500).send(error);
        }
})













module.exports = route;