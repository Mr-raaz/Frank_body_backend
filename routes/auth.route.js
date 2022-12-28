const express = require('express');
var passport = require('passport');
const FacebookStrategy = require("passport-facebook").Strategy;
const route = express.Router();
const userManualLogin = require("../controlers/user.controller")



route.post("/login",async (req, res)=>{
    console.log(req.body.email);
    let obj = {
        email : req.body.email,
        password : req.body.password
    }
    try{
        let result = await userManualLogin(obj);
        res.send({message:result});
    }catch(err){
        res.send({message:err});
    }
    
})

























// route.get("/facebook/callback",(req, res)=>{

//     res.send("auth facebook route")
// })
route.get("/test",(req, res)=>{
    console.log("auth test")
    // res.redirect("/");
    res.send({message:"replay"})
})
// route.get("/facebook",(req, res)=>{
//     res.send({message:"hello authh facebook"})
// })
passport.use(new FacebookStrategy({
    // clientID: 1519534005223811,
    // clientSecret: "1515bc288172c95235bb3140debe9477",
    clientID: 534813265280045,
    clientSecret:"517446206fc4a90a6bba6e7432e60147",
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    
    
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

route.get('/facebook',
  passport.authenticate('facebook'));

route.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log("got response from facebook");
    console.log(req.body);
    res.redirect('/');
  });

module.exports = route;

