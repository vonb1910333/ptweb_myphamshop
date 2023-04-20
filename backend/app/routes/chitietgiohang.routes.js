const chitietgiohang = require("../controllers/chitietgiohang.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    //create an order details
    router.post("/", chitietgiohang.create); 
    //Retrieve all order details
    router.get("/", chitietgiohang.findAll);

    router.get("/:SP_Ma", chitietgiohang.findOne);
    
    router.put("/:GH_Ma", chitietgiohang.update);

    router.delete("/:id", chitietgiohang.delete);
    app.use("/api/chitietgiohang", router);

};