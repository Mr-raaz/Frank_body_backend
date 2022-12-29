const products = require('../models/product.model');


async function getProducts(){   

    // let temp = awai
    let temp = await products.find();

    // console.log(temp);
    return temp;
}


module.exports = {
    getProducts
}