const hoadon = require("../controllers/hoadon.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    //create an order
    router.post("/", hoadon.create); 
    //Retrieve all orders
    router.get("/", hoadon.findAll);

    //Retrieve a single order with id
    router.get("/:id", hoadon.findOne);

    router.get("/hoadon/:DH_Ma", hoadon.findOneByMaDH)
    //Update a order with id
    // router.put("/:DH_Ma", donhang.update);

    //Delete a order with id
    // router.delete("/:DH_Ma", donhang.delete);

    // //Delete all orders
    // router.delete("/", donhang.deleteAll);

    app.use("/api/hoadon", router);

};