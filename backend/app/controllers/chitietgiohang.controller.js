const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const ChiTietGioHang = db.ChiTietGioHang;

exports.create = async(req,res) => {

    //validate request
    if(!req.body.GH_Ma){
        return next(new BadRequestError(400, "Mã đơn hàng không được bỏ trống!"));
    }
    if(!req.body.SP_Ma){
        return next(new BadRequestError(400, "Tên sản phẩm không được bỏ trống!"));
    }
    if(!req.body.CTGH_SoLuong){
        return next(new BadRequestError(400, "Số lượng sản phẩm không được bỏ trống!"));
    }
    // Create a order details
    const chitietgiohang = new ChiTietGioHang({
        GH_Ma: req.body.GH_Ma,
        SP_Ma: req.body.SP_Ma,
        CTGH_SoLuong: req.body.CTGH_SoLuong,
        ownerId: req.userId,
    });
    // Save order details in the DB
    const [error, document] = await handle(chitietgiohang.save());

    if(error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình tạo chi tiết giỏ hàng!")
        );
    }

    return res.send(document);
};


//*--------Retrive all order details  of store from the database
exports.findAll = async(req,res) => {
    const condition = { ownerId: req.userId };
    const GH_Ma = req.query.name;
    if(GH_Ma) {
        condition.GH_Ma = { $regex: new RegExp(GH_Ma), $options: "i"};
    }

    const [error, documents] = await handle(
        ChiTietGioHang.find(condition, '-ownerId')
    );

    if(error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất chi tiết giỏ hàng với mã ${req.params.GH_Ma}`)
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
        ChiTietGioHang.find(condition)
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


// *-----Update a category by the is in the request
exports.update = async (req, res) =>{
    console.log("hklwhd")
   if(!req.body){
        return next(
            new BadRequestError(400, "Dữ liệu cập nhật giỏ hàng không thể trống!")
        );
   }
   const condition = {
    GH_Ma: req.params.GH_Ma,
    SP_Ma: req.body.SP_Ma,
    ownerId: req.userId,
   };

   const [error, document] = await handle(
        ChiTietGioHang.findOneAndUpdate(condition, req.body, {
            new: true,
            projection: "-ownerId",
        })
   );
   if (error) {
    return next(
        new BadRequestError(500,`Lỗi trong quá trình cập nhật danh muc có mã id=${req.params.id}`
        )
    );
   }
   if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy danh mục!"));
    }
    
    return res.send({ message: "Cập nhật thông tin danh mục thành công." });

}


// if (!document) {
//     return next(new BadRequestError(404, "Không tìm thấy danh mục!"));
// }

// return res.send({ message: "Cập nhật thông tin danh mục thành công." });
// };

//Delete a category with the specified id in the request
exports.delete = async (req,res) => {  
        const condition = {
            _id: req.params.id,
            
        };
    
        const [error, document] = await handle(
            ChiTietGioHang.findOneAndDelete(condition
            )
        );
    
        if (error) {
            return next(
                new BadRequestError(500,`Không xóa được chi tiết giỏ hàng có mã ${req.params.DM_Ma}`)
            );
        }
    
        if (!document) {
            return res.send("Khong tim thay chi tiết giỏ hàng");
        }
    
        return res.send({ message: "Xóa chi tiết giỏ hàng thành công thành công" });
    
};

