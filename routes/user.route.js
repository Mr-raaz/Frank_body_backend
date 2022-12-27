const {Router} = require("express");
const user = require('../models/user.model');

const route = Router();



route.post('/create' ,async (req,res)=>{
   
    let temp = await user.create(req.body);
    
    res.send("working");
})









module.exports = route;