require('dotenv').config()
const express = require('express');
const router = express.Router();
// const userManualLogin = require("../controlers/user.controller")
const bscrypt = require('bcrypt');
// const generateToken = require('../controlers/user.controller');
const passport = require("passport");
const user = require('../models/user.model');
const jwt = require('jsonwebtoken');

const CLIENT_URL = "https://frankbody.netlify.app/";



  

router.post("/login", async (req, res)=>{
   
    try {
        let reqData = req.body;

        
        let db = await user.find({email:{$eq:reqData.email}});
        let db2 = await user.find({email:{$eq:reqData.email}}).count();
        if(db2 == 0){
          res.status(500).send({
            message:"user does not exist"
          })
        } else {

        

        if(db[0].logintype != "email-password"){
          res.status(500).send({
            message:"user does not exist"
          })
        }


        let passwordMatch = await  bscrypt.compare(reqData.password,db[0].password);

        if(passwordMatch){
          const token = await jwt.sign({email:reqData.email} , process.env.SECRET_KEY);
          console.log(db[0]._id);
          res.send({
              token:token,
              // sending user id with token for future use
              userId : db[0]._id
          })
        } else {
          res.status(500).send({
            message:"wrong password"
          })
        }

      }


    } catch (error) {
      res.status(500).send({
        message:"not working"
      })
    }
})
  
   
router.get("/login/success", (req, res) => {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
    });
  
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ['openid', 'email', 'profile'] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/github", passport.authenticate("github", { scope: ["email","profile"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router
























