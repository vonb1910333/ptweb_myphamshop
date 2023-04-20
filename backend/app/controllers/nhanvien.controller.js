const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const NhanVien = db.NhanVien;
const upload = require("../middlewares/upload");
const config = require("../config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.create = async (req, res) => {
    //validate request
    if (!req.body.NV_Ma) {
        return res.send(new BadRequestError(400, "Mã nhân viên không được bỏ trống!"));
    }
    if (!req.body.NV_Ten) {
        return next(new BadRequestError(400, "Tên nhân viên không được bỏ trống!"));
    }
    if (!req.body.NV_Ho) {
        return next(new BadRequestError(400, "Họ nhân viên không được bỏ trống!"));
    }
    if (!req.body.NV_CCCD) {
        return next(new BadRequestError(400, "CCCD?CMND nhân viên không được bỏ trống!"));
    }
    if (!req.body.NV_NgaySinh) {
        return next(new BadRequestError(400, "Ngày sinh nhân viên không được bỏ trống!"));
    }
    if (!req.body.NV_SDT) {
        return next(new BadRequestError(400, "SDT nhân viên không được bỏ trống!"));
    }
    if (!req.body.NV_Email) {
        return next(new BadRequestError(400, "Email nhân viên không được bỏ trống!"));
    }
    if (!req.body.NV_DiaChi) {
        return next(new BadRequestError(400, "Địa chỉ nhân viên không được bỏ trống!"));
    }
    if (!req.body.NV_MatKhau) {
        return next(new BadRequestError(400, "Mật khẩu tài khoản nhân viên không được bỏ trống!"));
    }
    if (!req.body.NV_LoaiNV) {
        return next(new BadRequestError(400, "Loại nhân viên không được bỏ trống!"));
    }
    if (!req.body.NV_GioiTinh) {
        return next(new BadRequestError(400, "Giới tính nhân viên không được bỏ trống!"));
    }
    if (!req.body.NV_KhoaTaiKhoan) {
        return next(new BadRequestError(400, "Giới tính nhân viên không được bỏ trống!"));
    }
    // Create a employee
    const nhanvien = new NhanVien({
        NV_Ma: req.body.NV_Ma,
        NV_Ten: req.body.NV_Ten,
        NV_Ho: req.body.NV_Ho,
        NV_CCCD: req.body.NV_CCCD,
        NV_NgaySinh: req.body.NV_NgaySinh,
        NV_SDT: req.body.NV_SDT,
        NV_Email: req.body.NV_Email,
        NV_DiaChi: req.body.NV_DiaChi,
        NV_MatKhau: bcrypt.hashSync(req.body.NV_MatKhau, 8),
        NV_LoaiNV: req.body.NV_LoaiNV,
        NV_GioiTinh: req.body.NV_GioiTinh,
        NV_KhoaTaiKhoan: req.body.NV_KhoaTaiKhoan,
        ownerId: req.userId,
    });
    // Save employee in the DB
    const [error, document] = await handle(nhanvien.save());

    if (error) {
        console.log(error);
        return res.send(error);
    }

    return res.send(document);
}

//*--------Retrive all employees of store from the database
exports.findAll = async (req, res) => {
    const condition = { ownerId: req.userId };
    const NV_Ten = req.query.name;
    if (NV_Ten) {
        condition.NV_Ten = { $regex: new RegExp(NV_Ten), $options: "i" };
    }

    const [error, documents] = await handle(
        NhanVien.find(condition, '-ownerId').sort({ 'NV_Ma': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất nhân viên`)
        );
    }

    return res.send(documents);
};

//*-------Find a single employee with an id
exports.findOne = async (req, res) => {
    const condition = {
        NV_Ma: req.params.NV_Ma
    };

    const [error, documents] = await handle(
        NhanVien.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất nhân viên!")
        );
    }
    if (!documents) {
        return res.send("Khong tim thay");
    }
    return res.send(documents);
};

//*-----Update a employee by the is in the request
exports.update = async (req, res) => {
    const condition = {
        NV_Ma: req.params.NV_Ma,
    };

    const curentPass = req.body.curentPass;
    if (curentPass != "") {
        const [errorss, nhanvien] = await handle(
            NhanVien.findOne(condition)
        );
        console.log(nhanvien.NV_MatKhau + " " + req.body.NV_MatKhau)
        const passwordIsValid = bcrypt.compareSync(
            curentPass,
            nhanvien.NV_MatKhau,
        );
        console.log(passwordIsValid + "cdsfd")
        if (!passwordIsValid) {
            return res.send("Sai mat khau");
        }
        else {
            const [errors, documents] = await handle(
                NhanVien.findOneAndUpdate(condition, {
                    $set: {
                        'NV_MatKhau': bcrypt.hashSync(req.body.NV_MatKhau, 8),
                    }
                }, {
                    new: true,
                    projection: "-ownerId",
                })
            );
            if (errors) {
                return res.send("Lỗi trong quá trình đổi mật khẩu")
            }
            console.log(documents);
            return res.send("Đổi mật khẩu thành công")
        }
    }
    else {
        if (req.body.NV_MatKhau == "") {
            const [error, document] = await handle(
                NhanVien.findOneAndUpdate(condition, {
                    $set: {
                        'NV_Ten': req.body.NV_Ten,
                        'NV_Ho': req.body.NV_Ho,
                        'NV_CCCD': req.body.NV_CCCD,
                        'NV_NgaySinh': req.body.NV_NgaySinh,
                        'NV_SDT': req.body.NV_SDT,
                        'NV_Email': req.body.NV_Email,
                        'NV_DiaChi': req.body.NV_DiaChi,
                        'NV_LoaiNV': req.body.NV_LoaiNV,
                        'NV_GioiTinh': req.body.NV_GioiTinh,
                        'NV_KhoaTaiKhoan': req.body.NV_KhoaTaiKhoan,
                    }
                },
                    {
                        new: true,
                        projection: "-ownerId",
                    })
            );
            if(error){
                return res.send("Lỗi trong quá tình cập nhật")
            }
            return res.send("Cập nhật thông tin nhân viên thành công")
        }
        else{
            const [error, document] = await handle(
                NhanVien.findOneAndUpdate(condition, {
                    $set: {
                        'NV_Ten': req.body.NV_Ten,
                        'NV_Ho': req.body.NV_Ho,
                        'NV_CCCD': req.body.NV_CCCD,
                        'NV_NgaySinh': req.body.NV_NgaySinh,
                        'NV_SDT': req.body.NV_SDT,
                        'NV_Email': req.body.NV_Email,
                        'NV_DiaChi': req.body.NV_DiaChi,
                        'NV_LoaiNV': req.body.NV_LoaiNV,
                        'NV_GioiTinh': req.body.NV_GioiTinh,
                        'NV_KhoaTaiKhoan': req.body.NV_KhoaTaiKhoan,
                        'NV_MatKhau': bcrypt.hashSync(req.body.NV_MatKhau, 8),
                    }
                },
                    {
                        new: true,
                        projection: "-ownerId",
                    })
            );
            if(error){
                return res.send("Lỗi trong quá tình cập nhật")
            }
            return res.send("Cập nhật thông tin nhân viên thành công")
        }
    }

};

//Delete a employee with the specified id in the request
exports.delete = async (req, res) => {
    const condition = {
        NV_Ma: req.params.NV_Ma,
    };
    console.log(req.params.NV_Ma)
    const [error, document] = await handle(
        NhanVien.findOneAndDelete(condition
        )
    );

    if (error) {
        return next(
            new BadRequestError(500, `Không xóa được nhân viên có mã ${req.params.NV_Ma}`)
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy nhân viên"));
    }

    return res.send({ message: "Xóa nhân viên thành công" });

};

exports.signin = async (req, res, next) => {
    const [errorss, nhanvien] = await handle(
        NhanVien.findOne({
            NV_Ma: req.body.NV_Ma,
        }).exec()
    );
    if(!nhanvien) return res.send("Khong tim thay");
    const passwordIsValid = bcrypt.compareSync(
        req.body.NV_MatKhau,
        nhanvien.NV_MatKhau,
    );
    if (!passwordIsValid) {
        return res.send("Sai mat khau");
    }


    const token = jwt.sign({ NV_Ma: nhanvien.NV_Ma }, config.jwt.secret, {
        expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
        NV_Ma: nhanvien._id,
        NV_Ten: nhanvien.NV_Ten,
        accessToken: token,
    });
};