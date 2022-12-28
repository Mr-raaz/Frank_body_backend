const product = require("../models/product.model");
const express = require("express");

app.get("/searched", async (req, res) => {
    const data = await getItem()
    return data;
})