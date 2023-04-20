const jwt = require("jsonwebtoken");
const config = require("../config");
const { BadRequestError } = require("../helpers/errors");

const verifyToken = (req, res, next) => {
    const khachhangHeader = String(req.headers.authorization || "");
    let token = null;

    if (khachhangHeader.startsWith("Bearer ")) {
        token = khachhangHeader.substring(7, khachhangHeader.length);
    }

    if (!token) {
        return next(new BadRequestError(401, "Unauthorized"));
    }

    jwt.verify(token, config.jwt.secret, (error, decoded) => {
        if (error) {
            console.log(error);
            return next(new BadRequestError(401, "Unauthorized"));
        }
        req.KH_Ma = decoded.KH_Ma;
        return next();
    });
};

module.exports = {
    verifyToken,
};
