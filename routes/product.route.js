const {Router} = require("express");
const {getProducts} = require('../controlers/product.controller');
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






module.exports = route;



