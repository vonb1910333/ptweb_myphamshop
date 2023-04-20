const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const DonHang = db.DonHang;

exports.create = async (req, res) => {

    //validate request
    if (!req.body.KH_Ma) {
        return next(new BadRequestError(400, "Mã khách hàng không được bỏ trống!"));
    }
    if (!req.body.DH_NgayDat) {
        return next(new BadRequestError(400, "Ngày đặt hàng không được bỏ trống!"));
    }
    if (!req.body.DH_TongSoLuong) {
        return next(new BadRequestError(400, "Tổng số lượng sản phẩm không được bỏ trống!"));
    }
    if (!req.body.DH_TongTien) {
        return next(new BadRequestError(400, "Tổng tiền của đơn hàng không được bỏ trống!"));
    }
    if (!req.body.DH_TrangThai) {
        return next(new BadRequestError(400, "Trạng thái của đơn hàng không được bỏ trống!"));
    }

    // Create a order
    const donhang = new DonHang({
        KH_Ma: req.body.KH_Ma,
        DH_NgayDat: req.body.DH_NgayDat,
        DH_TongSoLuong: req.body.DH_TongSoLuong,
        DH_TongTien: req.body.DH_TongTien,
        DH_DiaChiGiaoHang: req.body.DH_DiaChiGiaoHang,
        DH_GhiChu: req.body.DH_GhiChu,
        NV_Ma: " ",
        HD_SoHD:" ",
        DH_TrangThai: req.body.DH_TrangThai,
        ownerId: req.userId,
    });
    // Save order in the DB
    const [error, document] = await handle(donhang.save());

    if (error) {
        return res.send(error);

    }
    return res.send(document);
};


//*--------Retrive all orders of store from the database
exports.findAll = async (req, res) => {
    const condition = { ownerId: req.userId };
    const DH_TrangThai = req.query.name;
    console.log("Khytgj"+DH_TrangThai)
    if (DH_TrangThai) {
        condition.DH_TrangThai = { $regex: new RegExp(DH_TrangThai), $options: "i" };
    }

    const [error, documents] = await handle(
        DonHang.find(condition, '-ownerId')
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất đơn hàng với mã ${req.params.DH_Ma}`)
        );
    }
    console.log(documents)
    if (documents[0]==null) {
        const conditions = { ownerId: req.userId };
        const KH_Ma = req.query.name;
        console.log("Kh"+KH_Ma)
        if (KH_Ma) {
            conditions.KH_Ma = { $regex: new RegExp(KH_Ma), $options: "i" };
        }
        const [errors, documentss] = await handle(
            DonHang.find(conditions, '-ownerId')
        );
        if (errors) {
            return next(
                new BadRequestError(500, `Lỗi trong quá trình truy xuất đơn hàng với mã ${req.params.DH_Ma}`)
            );
        }
        console.log("alo")
        console.log(documentss)
        return res.send(documentss);
    
    }
return res.send(documents);
};

//*-------Find a single order with an id
exports.findOne = async (req, res) => {
    const condition = {
        _id: req.params.DH_Ma,
        ownerId: req.userId,
    };
    const [error, documents] = await handle(
        DonHang.findOne(condition, '-ownerId')
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất đơn hàng!")
        );
    }
    if (!documents) {
        return res.send("Khong tim thay");
    }
    return res.send(documents);
};

//*-----Update a order by the is in the request
exports.update = async (req, res) => {
    const condition = {
        _id: req.params.DH_Ma,
        ownerId: req.userId,
    };

    const [error, document] = await handle(
        DonHang.findOneAndUpdate(condition, req.body, {
            new: true,
            projection: "-ownerId",
        })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật thông tin đơn hàng có mã id=${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy đơn hàng!"));
    }

    return res.send({ message: "Cập nhật thông tin đơn hàng thành công." });
};

//Delete a order with the specified id in the request
exports.delete = async (req, res) => {
    const condition = {
        _id: req.params.id,
        ownerId: req.userId,
    };

    const [error, document] = await handle(
        DonHang.findOneAndDelete(condition, {
            projection: "-ownerId",
        })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Không xóa được đơn hàng có mã ${req.params.id}`)
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy đơn hàng"));
    }

    return res.send({ message: "Xóa đơn hàng thành công" });

};

