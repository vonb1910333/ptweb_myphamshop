const danhmuc = require("../controllers/danhmuc.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    //create a category
    router.post("/", danhmuc.create); 
    //Retrieve all categorys
    router.get("/", danhmuc.findAll);


    //Retrieve a single category with id
    router.get("/:DM_Ma", danhmuc.findOne);

    //Update a category with id
    router.put("/:DM_Ma", danhmuc.update);

    //Delete a category with id
    router.delete("/:DM_Ma", danhmuc.delete);

    // //Delete all categorys
    // router.delete("/", danhmuc.deleteAll);

    app.use("/api/danhmuc", router);

};