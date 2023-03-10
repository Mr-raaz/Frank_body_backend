require('dotenv').config()
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

        let {email} = await jwt.verify(Authentication , process.env.SECRET_KEY);

        let dbData = await user.find({email:{$eq:email}});
        
        let test = dbData[0];    

        let cartData = [...test.cart];
        
        const prod = await product.findById(id);

        if(prod){
            let idx = -1;
            let temp = cartData.filter((elem , index)=>{
                if(elem != null && String(elem._id) === String(prod._id)){
                    idx = index;
                }
                return elem != null && String(elem._id) === String(prod._id);
            })

            if(idx >=0){
                cartData[idx] = {...cartData[idx] , quantity:cartData[idx].quantity+1};
            } else {
                cartData.push(prod);
            }
            
                
        }

        

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

        let {email} = await jwt.verify(Authentication , process.env.SECRET_KEY);

        let dbData = await user.find({email:{$eq:email}});
        
        let test = dbData[0];
        


        let cartData = [...test.cart];

        const prod = await product.findById(id);


        let temp = cartData.filter((elem)=>{
            return elem != null && String(elem._id) !== String(prod._id);
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

        let {email} = await jwt.verify(Authentication , process.env.SECRET_KEY);

        let dbData = await user.find({email:{$eq:email}});
        
        let test = dbData[0];    

        let cartData = [...test.cart];

        res.send(cartData);
    } catch (error) {
        res.status(500).send("can't get the cart data");
    }
})


route.get('/category/:category' , async(req,res)=>{
    try {
        let {category} = req.params;
        let {sort , start , end} = req.query;

        if(category == 'foundation'){
            category = "KIT"
        }

        if(category == 'eyecare'){
            category = 'Skin Care';
        }

        let data = [];

        if(sort == 'none'){
            data = await product.find({categories:{$eq:category}})
            
        } else if (sort == 'best_price_high_to_low'){
            data = await product.find({categories:{$eq:category}}).sort({best_price: -1});
        } else {
            data = await product.find({categories:{$eq:category}}).sort(sort);
        }
        
        res.send(data);
    } catch (error) {
        res.status(500).send("can't find data");
    }
})



module.exports = route;



