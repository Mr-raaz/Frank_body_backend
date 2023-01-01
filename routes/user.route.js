const {Router} = require("express");
const user = require('../models/user.model');
const {userExist} = require('../middlewares/user.middlewars');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');
const {generateToken} = require('../controlers/user.controller');
const  transporter  = require("../db/configEmail");
const route = Router();


route.get('/',async(req,res)=>{
  try{
        const users= await user.find().lean().exec();
        res.status(200).send(users);
  }catch(err){
    res.send(err.message);
  }
})
route.post('/register' , userExist , async (req,res)=>{
   
        try {
            const userdetails = req.body;
            const hashPass = await bcrypt.hash(userdetails.password , 7);
            delete userdetails.password
            userdetails.password = hashPass
            userdetails.logintype = "email-password"
            const temp = await user.create(userdetails);
            res.status(201).send("Registered Successfully");

        } catch (error) {
            res.status(500).send(error);
        }
})


route.post('/googleregister' , async (req,res)=>{

    try {
  
      let {name , email , avtar} = req.body;
  
      let check = await user.find({email:{$eq:email}}).count();

      if(check == 0){

        let temp = await user.create({
            name:name,
            email:email,
            avtar:avtar,
            logintype:"google"
        })
      }

      let token = await jwt.sign({email:email} , "secretkey");
      
      res.send({
        token:token
      })

    } catch (error) {
      res.status(500).send("something went wrong");
    }
    
  })


  route.post('/sendResetPassword',async(req,res)=>{
    
    const {email} =req.body;
    if(email){
        const temp =await user.findOne({email : email});
    
        if(temp){
            const  secret= temp._id + "ayush"
            const token = jwt.sign({userID : temp._id},secret,{
                expiresIn :'5d'
            })
            const link =`http://localhost:3000/user/reset/${temp._id}/${token}`
            // console.log(link);
             try {
            let info =await transporter.sendMail({
             from: 'frankbody123@gmail.com',
             to :temp.email,
             subject : "FrankBody - Password Reset Link",
             html: `<a href=${link} >Click Here</a> to Reset Your Password`
            })
            res.send({
              "status":"success",
              "message":"Password Reset Email sent successfully  Please check your Mail",
              "info": info,
          })
          }catch(err){
              res.send(err);
            }
           
        }else{
            res.send({
                "status":"failed",
                "message":"User does not exist",
            })
        }
    }else{
        res.send({
            "status":"failed",
            "message":"Email is required",
        })
    }


})


route.post('/userResetPassword/:id/:token', async(req, res)=>{
  const {password, confirm_password} =req.body;
 
   const {id,token}=req.params;
 console.log(id)
   const temp =await user.findById(id);
   if(temp){

   }
   else{
    
   }
   console.log(temp)
 const secretId= temp._id.toString();;
   const new_secret=secretId + "ayush";
   try{
     jwt.verify(token, new_secret);
      if(password && confirm_password){
        if(password !== confirm_password){
         res.send({
             "status":"failed",
             "message":"Password does not match",
         })
        }else{
          const salt =await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);
          await user.findByIdAndUpdate(req.params._id,{ $set:{
             password : hashPassword
          }})
          res.send({
             "status":"success",
             "message":"Password Reset successfully",
         })
        }
      }else{
         res.send({
             "status":"failed",
             "message":"All Fields are Required",
         })
 
      }
   }catch(e){
    console.log(e);
     res.send({
      
         "status":"failed",
         "message":"Invalid Token",
     })
   }
 
 })




route.post('/setAddress' , async(req,res)=>{
  try {

    let {token  , address} = req.body;

    let {email} = await jwt.verify(token , "secretkey");

    let dbData = await user.find({email:{$eq:email}});
    
    let newaddress = [address];

    let check = await user.updateOne({email:{$eq:email}} , {
      $set:{
          address:newaddress
      }
  });
    res.send("address updated");
  } catch (error) {
    res.status(500).send("can't add address");
  }
})


route.post('/orderPlaced' , async(req,res)=>{

  try {
      let token = req.body.token;

      let {email} = await jwt.verify(token , "secretkey");

      let dbData = await user.find({email:{$eq:email}});

      let db = dbData[0];

      let cartData = db.cart;
      let orderhistory = db.orderhistory;
      // let emptyCart = [];

      let check = await user.updateOne({email:{$eq:email}} , {
        $set:{
            orderhistory:[...orderhistory , ...cartData],
            cart:[]
        }
    });

      res.send("done");
  } catch (error) {
    res.status(500).send("order Failed");
  }
})


module.exports = route;