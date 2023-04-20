const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const ChiTietDonHang = db.ChiTietDonHang;

exports.create = async(req,res) => {

    //validate request
    if(!req.body.DH_Ma){
        return next(new BadRequestError(400, "Mã đơn hàng không được bỏ trống!"));
    }
    if(!req.body.SP_Ma){
        return next(new BadRequestError(400, "Tên sản phẩm không được bỏ trống!"));
    }
    if(!req.body.CTDH_SoLuong){
        return next(new BadRequestError(400, "Số lượng sản phẩm không được bỏ trống!"));
    }
    if(!req.body.CTDH_Gia){
        return next(new BadRequestError(400, "Gia sản phẩm không được bỏ trống!"));
    }
    // Create a order details
    const chitietdonhang = new ChiTietDonHang({
        DH_Ma: req.body.DH_Ma,
        SP_Ma: req.body.SP_Ma,
        CTDH_SoLuong: req.body.CTDH_SoLuong,
        CTDH_Gia: req.body.CTDH_Gia,
        ownerId: req.userId,
    });
    // Save order details in the DB
    const [error, document] = await handle(chitietdonhang.save());

    if(error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình tạo chi tiết đơn hàng!")
        );
    }

    return res.send(document);
};


//*--------Retrive all order details  of store from the database
exports.findAll = async(req,res) => {
    const condition = { ownerId: req.userId };
    const DH_Ma = req.query.name;
    if(DH_Ma) {
        condition.DH_Ma = { $regex: new RegExp(DH_Ma), $options: "i"};
    }

    const [error, documents] = await handle(
        ChiTietDonHang.find(condition, '-ownerId')
    );

    if(error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất chi tiết đơn hàng với mã ${req.params.DH_Ma}`)
        );
    }

    return res.send(documents);
};

// *-------Find a single category with an id
exports.findOne= async (req,res) => {

    const condition = {
             SP_Ma: req.params.SP_Ma 
    };
    const [error, document] = await handle(
        ChiTietDonHang.find(condition)
    );

    if(error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất sản phẩm!")
        );
    }
    if(!document){
        return res.send("Khong tim thay");
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

