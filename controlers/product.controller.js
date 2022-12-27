const products = require('../models/product.model');


async function getProducts(){   
    let temp = await products.find();
    return temp;
}


module.exports = {
    getProducts
}