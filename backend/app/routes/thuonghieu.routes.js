const thuonghieu = require("../controllers/thuonghieu.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    //create a brand
    router.post("/", thuonghieu.create); 
    //Retrieve all brand
    router.get("/", thuonghieu.findAll);

    //Retrieve a single brand with id
    router.get("/:TH_Ma", thuonghieu.findOne);

    //Update a cbrand with id
    router.put("/:TH_Ma", thuonghieu.update);

    //Delete a brand with id
    router.delete("/:TH_Ma", thuonghieu.delete);

    app.use("/api/thuonghieu", router);

};