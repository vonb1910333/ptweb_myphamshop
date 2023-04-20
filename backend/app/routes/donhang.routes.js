const donhang = require("../controllers/donhang.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    //create an order
    router.post("/", donhang.create); 
    //Retrieve all orders
    router.get("/", donhang.findAll);

    //Retrieve a single order with id
    router.get("/:DH_Ma", donhang.findOne);

    // Update a order with id
    router.put("/:DH_Ma", donhang.update);

    //Delete a order with id
    // router.delete("/:DH_Ma", donhang.delete);

    // //Delete all orders
    // router.delete("/", donhang.deleteAll);

    app.use("/api/donhang", router);

};