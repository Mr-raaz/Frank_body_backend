const {Router} = require("express");
const user = require('../models/user.model');
const {userExist} = require('../middlewares/user.middlewars');
const bcrypt = require('bcrypt');
const {generateToken} = require('../controlers/user.controller');
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


route.post('/googleregister' , async (req,res)=>{

    try {
  
      let {name , email , avtar} = req.body;
  
      let check = await user.find({email:{$eq:email}}).count();

      if(check == 0){

        let temp = await user.create({
            name:name,
            email:email,
            avtar:avtar,
            logintype:"google"
        })
      }

      let token = await generateToken({email:email} , "secretkey");
      
      res.send({
        token:token
      })

    } catch (error) {
      res.status(500).send("something went wrong");
    }
    
  })












module.exports = route;