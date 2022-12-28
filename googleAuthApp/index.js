const express = require("express");
const session = require("express-session");
const passport = require("passport");
// require('./passportsetup')
const app = express();
require('./passportsetup')(passport)

app.use(session(({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  })));
  app.use(passport.initialize())
app.use(passport.session())

app.get('/',(req,res)=>{
    res.send('hello app')
})
app.get('/google', passport.authenticate('google', { scope: ['profile','email'] }));
app.get('/googleCallback', passport.authenticate( 'google', {
    successRedirect: 'http://127.0.0.1:5500/googleAuthApp/sucess.html',
    failureRedirect: 'http://127.0.0.1:5500/googleAuthApp/google.html'
}))

app.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }})
    res.redirect('http://127.0.0.1:5500/googleAuthApp/google.html')
  })
const port = 8080;

app.listen(port,()=>{
    console.log(`port is running on http://localhost:${port}`);
})