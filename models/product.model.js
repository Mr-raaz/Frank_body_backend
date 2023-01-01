const mongoose = require("mongoose");

const product = new mongoose.Schema({

    prod_name:{
        type:String,
    },
    categories:{
        type:String
    },
    best_price:{
        type:Number
    },
    mrp:{
        type:Number
    },
    url_1:{
        type:String
    },
    url_2:{
        type:String
    },
    quantity:{
        type:Number
    }

})

const productmodel = mongoose.model('products' , product);

module.exports = productmodel;