// const passport = require('passport');

const googleAouthstatregy = require('passport-google-oauth2').Strategy;


module.exports = function(passport){
    passport.use(new googleAouthstatregy(
        {
        clientID:"218053870044-di09i7bpjgok34rdbtpcoabfgrq3hj2c.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL:"http://localhost:8080/googleCallback",
        passReqToCallback:true
    },
    (request, accessToken, refreshToken, profile, done)=>{
        
        console.log("hello my app",profile);
        return done(null,profile);
   }
   
   )
   
   )
    // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user)
  })

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
      console.log(id);
      done(null,id)
  })
}