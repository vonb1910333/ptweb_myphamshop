const { BadRequestError } = require("../helpers/errors");
const config = require("../config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const handle = require("../helpers/promise");
const db = require("../models");
const KhachHang = db.KhachHang;
const upload = require("../middlewares/upload");

//*-------------Create a customer 
exports.create = async (req, res) => {
    //validate request
    if (!req.body.KH_Ten) {
        return next(new BadRequestError(400, "Tên không được bỏ trống!"));
    }

    if (!req.body.KH_SDT) {
        return next(new BadRequestError(400, "SDT đăng ký tài khoản không được bỏ trống!"));
    }
    if (!req.body.KH_MatKhau) {
        return next(new BadRequestError(400, "Mật khẩu tài khoản không được bỏ trống!"));
    }

    // Create a customer
    const khachhang = new KhachHang({
        KH_Ten: req.body.KH_Ten,
        KH_SDT: req.body.KH_SDT,
        KH_MatKhau: req.body.KH_MatKhau,
        ownerId: req.userId,
    });
    // Save customer in the DB
    const [error, document] = await handle(khachhang.save());

    if (error) {
        return res.send(error);

    }
    return res.send(document);
}



//*--------Retrive all customers of store from the database
exports.findAll = async (req, res) => {
    const condition = { ownerId: req.userId };
    const KH_SDT = req.query.name;
    console.log(req.query.KH_name);
    if(KH_SDT) {
        condition.KH_SDT = { $regex: new RegExp(KH_SDT), $options: "i"};
    }
    const [error, documents] = await handle(
        KhachHang.find(condition, '-ownerId')
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất khách hàng với SDT ${req.params.KH_SDT}`)
        );
    }
    console.log(documents)
    return res.send(documents);
};

//*-------Find a single customer with an id
exports.findOneByID = async (req, res) => {
    const condition = {
        _id: req.params.KH,
        ownerId: req.userId,

    };
    const [error, documents] = await handle(
        KhachHang.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất khách hàng!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy");
    }
    return res.send(documents);
};


//*-----Update a customer by the is in the request
exports.update = async (req, res) => {
    if (!req.body) {
        return next(
            new BadRequestError(400, "Dữ liệu cập nhật khách hàng không thể trống!")
        );
    }

    const condition = {
        KH_SDT: req.body.KH_SDT,
    };

    const [error, document] = await handle(
        KhachHang.findOneAndUpdate(condition, {
            $set: {
                'GH_Ma': req.body.GH_Ma,
                // 'KH_MatKhau': bcrypt.hashSync(req.body.KH_MatKhau, 8)
            }
        }, {
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật thông tin khách hàng`)
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy khách hàng!"));
    }

    return res.send({ message: "Cập nhật thông tin khách hàng thành công." });
};

//Delete a customer with the specified id in the request
exports.delete = async (req, res) => {
    const condition = {
        KH_SDT: req.body.KH_SDT,
    };

    const [error, document] = await handle(
        KhachHang.findOneAndDelete(condition, {
            projection: "-ownerId",
        })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Không xóa được khách hàng có mã ${req.params.id}`)
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy khách hàng"));
    }

    return res.send({ message: "Xóa khách hàng thành công" });

};


exports.signup = async (req, res, next) => {
    const khachhang = new KhachHang({
        KH_Ten: req.body.KH_Ten,
        KH_SDT: req.body.KH_SDT,
        KH_MatKhau: bcrypt.hashSync(req.body.KH_MatKhau, 8),
    });

    const [error] = await handle(khachhang.save());

    if (error) {
        let statusCode = 400;
        let { KH_Ten = {}, KH_SDT = {}, KH_MatKhau = {} } = error.errors;

        const errorMessage =
            KH_Ten.message || KH_SDT.message || KH_MatKhau.message;
        if (!errorMessage) {
            statusCode = 500;
        }

        return next(new BadRequestError(statusCode, errorMessage));
    }

    res.send({ message: "Đăng ký tài khoản thành công" });
};

exports.signin = async (req, res, next) => {
    const [error, khachhang] = await handle(
        KhachHang.findOne({
            KH_SDT: req.body.KH_SDT,
        }).exec()
    );

    if (error) {
        return next(new BadRequestError(500));
    }
    if (!khachhang) {
        return next(new BadRequestError(401, "Incorrect username"));
    }
    
    const passwordIsValid = bcrypt.compareSync(
        req.body.KH_MatKhau,
        khachhang.KH_MatKhau,
    );
console.log(passwordIsValid)
    if (!passwordIsValid) {
        return next(new BadRequestError(401, " password"));
    }

    const token = jwt.sign({ KH_Ma: khachhang.KH_Ma }, config.jwt.secret, {
        expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
        KH_Ma: khachhang._id,
        KH_Ten: khachhang.KH_Ten,
        KH_SDT: khachhang.KH_SDT,
        GH_Ma: khachhang.GH_Ma,
        accessToken: token,
    });
};


