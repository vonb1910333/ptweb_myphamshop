const nhanvien = require("../controllers/nhanvien.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", nhanvien.create); 
    //Retrieve all  employee
    router.get("/", nhanvien.findAll);

    //Retrieve a single employee with id
    router.get("/:NV_Ma", nhanvien.findOne);

    //Update a employee with id
    router.put("/:NV_Ma", nhanvien.update);

    //Delete a employee with id
    router.delete("/:NV_Ma", nhanvien.delete);
    router.post("/signin", nhanvien.signin);
    // //Delete all employee
    // router.delete("/", nhanvien.deleteAll);

    app.use("/api/nhanvien", router);

};