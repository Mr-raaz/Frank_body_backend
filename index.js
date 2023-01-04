// required modules......
const express = require('express');
const cors = require('cors');
const connect = require("./db/connect");
const authRoute = require('./routes/auth.route');
const userRoute = require('./routes/user.route');
const productRoute = require('./routes/product.route');
const profileRoute = require("./routes/profile.route")
const cookieSession = require("cookie-session");
const passportSetup = require("./passport");
const passport = require("passport");
const commentRoute = require('./routes/comments.route');
const app = express();


app.use(
  cookieSession({ name: "session", keys: ["ayush"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
// app.use(
//   cors({
//     origin: "https://frank-body-backend-git-produtnew2-mr-raaz.vercel.app",
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true,
//   })
// );


const port = process.env.PORT || 5000;

// creating app...



// important middlewares....

app.use(express.json());

// routes....
app.use('/user',userRoute);
app.use('/products' , productRoute);
app.use("/auth", authRoute);
app.use('/comment' , commentRoute);
app.use('/profile', profileRoute);

app.get('/' , (req,res) =>{
    res.send("server is working....");
})






// connecting to database.....
connect().then(()=>{
    console.log("connected to database");
}).catch((err) =>{
    console.log("can't connect to database");
})



// running server.....
app.listen(port , () =>{
    console.log(`server is running on port ${port}`);
})
