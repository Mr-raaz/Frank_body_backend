const {Router} = require("express");
const {getProducts} = require('../controlers/product.controller');
const product = require('../models/product.model');
const jwt = require('jsonwebtoken');
const user = require("../models/user.model");
const { db } = require("../models/user.model");
const route = Router();


route.get('/' , async (req,res)=>{
    try {
        const products = await getProducts();
        
        res.send({
            data:products
        })
    } catch (error) {
        res.status(500).send(err);
    }
})

route.get('/:id' , async (req,res)=>{

    try {
        
        const {id} = req.params;
        
        const productDetail = await product.findById(id);

        res.send(productDetail);
        
    } catch (error) {
        res.status(404).send("product not found");
    }

})


route.post('/addtocart' , async (req,res) =>{
    
    try {

        let {headers:{Authentication} , data:{id}} = req.body;

        let {email} = await jwt.verify(Authentication , "secretkey");

        let dbData = await user.find({email:{$eq:email}});
        
        let test = dbData[0];    

        let cartData = [...test.cart];
        
        const prod = await product.findById(id);

        cartData.push(prod);

        let check = await user.updateOne({email:{$eq:email}} , {
            $set:{
                cart:cartData
            }
        });

        res.send(cartData);
        
    } catch (error) {
        res.status(500).send("Can't add to cart");
    }
})

route.post('/deletefromcart' , async(req,res)=>{

    try {
        let {headers:{Authentication} , data:{id}} = req.body;

        let {email} = await jwt.verify(Authentication , "secretkey");

        let dbData = await user.find({email:{$eq:email}});
        
        let test = dbData[0];
        


        let cartData = [...test.cart];

        const prod = await product.findById(id);


        let temp = cartData.filter((elem)=>{
            return String(elem._id) !== String(prod._id);
        })

        let check = await user.updateOne({email:{$eq:email}} , {
            $set:{
                cart:temp
            }
        });

        res.send(temp);

    } catch (error) {

        console.log(error);

        res.status(500).send("can't remove product");
    }
})


route.post('/getcart' , async (req,res)=>{

    try {
        let {headers:{Authentication}} = req.body;

        let {email} = await jwt.verify(Authentication , "secretkey");

        let dbData = await user.find({email:{$eq:email}});
        
        let test = dbData[0];    

        let cartData = [...test.cart];

        res.send(cartData);
    } catch (error) {
        res.status(500).send("can't get the cart data");
    }
})



module.exports = route;



