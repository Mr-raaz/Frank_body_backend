const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");

const GOOGLE_CLIENT_ID =
  "218053870044-di09i7bpjgok34rdbtpcoabfgrq3hj2c.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

 GITHUB_CLIENT_ID = "30a882006b4d419d37a9";
 GITHUB_CLIENT_SECRET = "c659bc3864831a398c69050a4897d1517abf8623";

 FACEBOOK_APP_ID = "567315141506454";
 FACEBOOK_APP_SECRET = "c19812cfaeef2987de243a0d32d2009c";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
   async function (accessToken, refreshToken, profile, done) {
       
    const newUser = {
      googleId: profile.id,
      displayName: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      image: profile.photos[0].value,
      email: profile.emails[0].value
    }
    try {
      let user = await User.findOne({ googleId: profile.id })

      if (user) {
        done(null, user)
      } else {
        user = await User.create(newUser)
        done(null, user)
      }
    } catch (err) {
      console.error(err)
    }
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // console.log(profile);

      done(null, profile);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
  
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
