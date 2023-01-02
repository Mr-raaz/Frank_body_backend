const {Router} = require('express');
const product = require('../models/product.model');
const jwt = require('jsonwebtoken');
const user = require('../models/user.model');
const route = Router();



route.post('/:id' , async(req,res) =>{

    try {
        let {token , comment} = req.body;

        let {email} = await jwt.verify(token.token , "secretkey");

        let dbData = await user.find({email:{$eq:email}});
        
        let id = req.params.id;

        let db = await product.findById(id);


        let commentsList = db.comments;

        commentsList.push({
            ...comment,
            user_name:dbData[0].name
        });

        let check = await product.findByIdAndUpdate(id, {
            $set:{
                comments:commentsList
            }
        });
        
        res.send("working");
    } catch (error) {
        console.log("error occured");
        res.status(500).send("can't post comment");
    }

    
})


route.get('/get/:id' , async(req,res)=>{

    try {
        let id = req.params.id;
        let db = await product.findById(id);
        let commentsList = db.comments;
        res.send(commentsList);
    } catch (error) {
        res.status(500).send("can't find data");
    }
})











module.exports = route;