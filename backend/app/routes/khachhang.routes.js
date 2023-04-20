const khachhang = require("../controllers/khachhang.controller");
const middlewares = require("../middlewares");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    //create a customer
    router.post("/", khachhang.create); 
    //Retrieve all customers
    router.get("/", khachhang.findAll);

    //Retrieve a single customer with id
    router.get("/:KH", khachhang.findOneByID);
    
    //Update a customer with id
    router.put("/:id", khachhang.update);

    //Delete a customer with id
    router.delete("/:KH_SDT", khachhang.delete);

    // //Delete all customers
    // router.delete("/", khachhang.deleteAll);
    router.post(
        "/signup",
        [middlewares.checkDuplicateSDT],
        khachhang.signup
    );

    router.post("/signin", khachhang.signin);
    app.use("/api/khachhang", router);

};