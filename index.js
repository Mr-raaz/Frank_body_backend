// required modules......
const express = require('express');
const cors = require('cors');
const connect = require("./db/connect");
const userRoute = require('./routes/user.route');
const productRoute = require('./routes/product.route');
const authRoute = require("./routes/auth.route")
// port Number
const port = process.env.PORT || 8080;

// creating app...
const app = express();


// important middlewares....
app.use(cors());
app.use(express.json());

// routes....
app.use('/user',userRoute);
app.use('/products' , productRoute);
app.use('/auth', authRoute)


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