const giohang = require("../controllers/giohang.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    //create an order
    router.post("/", giohang.create); 
    //Retrieve all orders
    // router.get("/", giohang.findAll);

    //Retrieve a single order with id
    router.get("/:GH_Ma", giohang.findOne);

    // Update a order with id
    router.put("/:GH_Ma", giohang.update);

    //Delete a order with id
    // router.delete("/:DH_Ma", donhang.delete);

    // //Delete all orders
    // router.delete("/", donhang.deleteAll);

    app.use("/api/giohang", router);

};