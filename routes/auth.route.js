const express = require('express');
var passport = require('passport');
const FacebookStrategy = require("passport-facebook").Strategy;
const route = express.Router();

// route.get("/facebook/callback",(req, res)=>{

//     res.send("auth facebook route")
// })

passport.use(new FacebookStrategy({
    clientID: 1519534005223811,
    clientSecret: "1515bc288172c95235bb3140debe9477",
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
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
    res.redirect('/');
  });

module.exports = route;

