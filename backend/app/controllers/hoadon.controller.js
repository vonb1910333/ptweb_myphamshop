const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const HoaDon = db.HoaDon;

exports.create = async(req,res) => {

    if(!req.body.DH_Ma){
        return next(new BadRequestError(400, "Ma don hang cua hoa don không được bỏ trống!"));
    }
    if(!req.body.HD_NgayLap){
        return next(new BadRequestError(400, "Ngay lap hoa don không được bỏ trống!"));
    }
    if(!req.body.HD_ThoiGianLap){
        return next(new BadRequestError(400, "Thoi gian lap hoa don không được bỏ trống!"));
    }
    if(!req.body.HD_TongTien){
        return next(new BadRequestError(400, "Tong tien hoa don không được bỏ trống!"));
    }
    // Create a order details
    const hoadon = new HoaDon({
        DH_Ma: req.body.DH_Ma,
        HD_NgayLap: req.body.HD_NgayLap,
        HD_ThoiGianLap: req.body.HD_ThoiGianLap,
        HD_TongTien: req.body.HD_TongTien,
        ownerId: req.userId,
    });
    // Save order details in the DB
    const [error, document] = await handle(hoadon.save());

    if(error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình tạo chi tiết đơn hàng!")
        );
    }

    return res.send(document);
};


//*--------Retrive all order details  of store from the database
exports.findAll = async(req,res) => {
    const condition = { 
        KH_Ma : req.query.name 
    };

    if(KH_Ma){
        condition.KH_Ma = { $regex: new RegExp(KH_Ma), $options: "i" };
    }
    const [error, documents] = await handle(
        HoaDon.findOne(condition)
    );

    if(error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất hoa don!")
        );
    }
    if(!documents){
        return res.send("Chua ton tai");
    }
    return res.send(documents);
};

//*-----------------Find a single category with an DH_ma
exports.findOneByMaDH = async (req, res) => {
    const condition = { 
        DH_Ma : req.params.DH_Ma
    };
    const [error, documents] = await handle(
        HoaDon.findOne(condition)
    );

    if(error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất hoa don!")
        );
    }
    if(!documents){
        return res.send("Chua ton tai");
    }
    return res.send(documents);
}

// *-------Find a single category with an id
exports.findOne = async (req,res) => {
    const condition = {
        _id: req.params.id,
        ownerId: req.userId 
    };

    const [error, document] = await handle(
        HoaDon.findOne(condition,'-ownerId')
    );

    if(error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất hoa don!")
        );
    }
    if(!document){
        return res.send("Chua ton tai");
    }
    return res.send(document);
};


//*-----Update a category by the is in the request
// exports.update = async (req, res) =>{
//    if(!req.body){
//         return next(
//             new BadRequestError(400, "Dữ liệu cập nhật danh mục không thể trống!")
//         );
//    }

//    const condition = {
//     _id: res.params.id,
//     ownerId: req.userId,
//    };

//    const [error, document] = await handle(
//         DanhMuc.findOneAndUpdate(condition, req.body, {
//             new: true,
//             projection: "-ownerId",
//         })
//    );
//    if (error) {
//     return next(
//         new BadRequestError(500,`Lỗi trong quá trình cập nhật danh muc có mã id=${req.params.id}`
//         )
//     );
// }

// if (!document) {
//     return next(new BadRequestError(404, "Không tìm thấy danh mục!"));
// }

// return res.send({ message: "Cập nhật thông tin danh mục thành công." });
// };

// //Delete a category with the specified id in the request
// exports.delete = async (req,res) => {    
//         const condition = {
//             DM_Ma: req.params.DM_Ma
//         };
    
//         const [error, document] = await handle(
//             DanhMuc.findOneAndDelete(condition
//             )
//         );
    
//         if (error) {
//             return next(
//                 new BadRequestError(500,`Không xóa được danh mục có mã ${req.params.DM_Ma}`)
//             );
//         }
    
//         if (!document) {
//             return res.send("Khong tim thay danh muc");
//         }
    
//         return res.send({ message: "Xóa danh mục thành công" });
    
// };

