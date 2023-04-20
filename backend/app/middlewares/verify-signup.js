const { BadRequestError } = require("../helpers/errors");
const db = require("../models");
const KhachHang = db.KhachHang;

const checkDuplicateSDT = async (req, res, next) => {
    try {
        const userBySDT = await KhachHang.findOne({
            KH_SDT: req.body.KH_SDT,
        }).exec();

        if (userBySDT) {
            return next(new BadRequestError(422, "Số điện thoại đã được đăng ký"));
        }

        return next();
    } catch (error) {
        console.log(error);
        return next(new BadRequestError(500));
    }
};

module.exports = {
    checkDuplicateSDT,
};
