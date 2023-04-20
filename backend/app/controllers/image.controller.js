const { BadRequestError } = require("../helpers/errors");
const config = require("../config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const handle = require("../helpers/promise");
const db = require("../models");
const Image = db.Image;

//*-------------Create a customer 
exports.create = async (req, res) => {
    //validate request
//     if (!req.body.KH_Ten) {
//         return next(new BadRequestError(400, "Tên không được bỏ trống!"));
//     }


    // Create a customer
    const image = new Image({
        filename: req.body.filename,

        ownerId: req.userId,
    });
    // Save customer in the DB
    const [error, document] = await handle(image.save());

    if (error) {
        return res.send(error);

    }
    return res.send(document);
};