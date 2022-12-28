const {Router} = require("express");
const {getProducts} = require('../controlers/product.controller');
const product = require('../models/product.model');
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






module.exports = route;



