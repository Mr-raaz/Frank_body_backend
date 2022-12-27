const {Router} = require("express");
const user = require('../models/user.model');

const route = Router();



route.post('/create' ,async (req,res)=>{
   
    let temp = await user.create(req.body);
    
    res.send("working");
})

route.get('/:email' , async(req,res)=>{

    let {email} = req.params;

    let temp = await user.find({email:{$eq:email}});

    console.log(temp);
    res.send("fin...");
})









module.exports = route;