const mongoose = require('mongoose')

const products = require("../controlers/product.controller");

async function getItem() {
    let data = await products.find();
    return data;
}