const express = require('express');
const router = express.Router();
const userManualLogin = require("../controlers/user.controller")

const passport = require("passport");

const CLIENT_URL = "http://localhost:3000/";



  

router.post("/login",async (req, res)=>{
    console.log(req.body.email);
    let obj = {
        email : req.body.email,
        password : req.body.password
    }
    try{
        let result = await userManualLogin(obj);
        if(result !== "password is incorrent"){
          res.cookie("token",result);
          res.send({token:result});
        }else{
          res.send({result:"password is incorrent"})
        }
        
    }catch(err){
        res.send({message:err});
    }
    
})
  
   
router.get("/login/success", (req, res) => {
        console.log(req);
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

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

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
























