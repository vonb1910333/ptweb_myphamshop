const sanpham = require("../controllers/sanpham.controller");
const express = require("express");
const upload = require("../middlewares/upload");

module.exports = (app) => {
    var router = express.Router();
''

    // router.post("/",upload.single('SP_HinhAnh'),sanpham.create); 
    router.post("/",sanpham.create); 

    //Retrieve all products
    router.get("/", sanpham.findAll);

    //Retrieve a single product with id
    router.get("/:SP_Ma", sanpham.findOne);

    //Update a product with id
    router.put("/:SP_Ma", sanpham.update);

    //Delete a product with id
    router.delete("/:SP_Ma", sanpham.delete);

    // //Delete all products
    // router.delete("/", sanpham.deleteAll);

    app.use("/api/sanpham", router);

};