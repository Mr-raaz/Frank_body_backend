const {Router} = require("express");
const route = Router();



route.get('/' , (req,res)=>{
    res.send("products will display here....");
})






module.exports = route;



