const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const GioHang = db.GioHang;


exports.create = async(req,res) => {

console.log(req.body.GH_TongSoLuong+"csa");
    if(!req.body.KH_Ma){
        return next(new BadRequestError(400, "Mã khách hàng không được bỏ trống!"));
    }
    if(!req.body.GH_TongSoLuong){
        return next(new BadRequestError(400, "Số lượng sản phẩm không được bỏ trống!"));
    }
    //validate request

    // Create a category
    const giohang = new GioHang({
     KH_Ma: req.body.KH_Ma,
     GH_TongSoLuong: req.body.GH_TongSoLuong,
        ownerId: req.userId,
    });
    // Save category in the DB
    const [error, document] = await handle(giohang.save());

    if(error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình tạo giỏ hàng!")
        );
    }
    // res.send({ message: 'create handler'});

    return res.send(document);
};


//*--------Retrive all category  of store from the database
// exports.findAll = async(req,res) => {
//     const condition = { ownerId: req.userId };
//     const DM_Ten = req.query.name;
//     if(DM_Ten) {
//         condition.DM_Ten = { $regex: new RegExp(DM_Ten), $options: "i"};
//     }

//     const [error, documents] = await handle(
//         DanhMuc.find(condition, '-ownerId').sort({'DM_Ma':1})
//     );

//     if(error) {
//         return next(
//             new BadRequestError(500, `Lỗi trong quá trình truy xuất danh mục với mã ${req.params.DM_Ma}`)
//         );
//     }

//     return res.send(documents);
// };

//*-------Find a single category with an id
exports.findOne = async (req,res) => {
    const condition = {
        _id: req.params.GH_Ma,
        ownerId: req.userId,
    };

    const [error, document] = await handle(
        GioHang.findOne(condition)
    );

    if(error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất giỏ hàng!")
        );
    }
    if(!document){
        return res.send("Chua ton tai");
    }
    return res.send(document);
};


//*-----Update a category by the is in the request
exports.update = async (req, res) =>{
   if(!req.body){
        return next(
            new BadRequestError(400, "Dữ liệu cập nhật giỏ hàng không thể trống!")
        );
   }

   const condition = {
    _id: req.params.GH_Ma,
    ownerId: req.userId,
   };
console.log(req.params.GH_Ma+" "+req.body.GH_TongSoLuong);
   const [error, document] = await handle(
        GioHang.findOneAndUpdate(condition, req.body, {
            new: true,
            projection: "-ownerId",
        })
   );
   if (error) {
    return next(
        new BadRequestError(500,`Lỗi trong quá trình cập nhật giỏ hàng có mã id=${req.params.KH_Ma}`
        )
    );
}

if (!document) {
    return next(new BadRequestError(404, "Không tìm thấy giỏ hàng!"));
}

return res.send({ message: "Cập nhật thông tin giỏ hàng thành công." });
};

//Delete a category with the specified id in the request
exports.delete = async (req,res) => {    
        const condition = {
            KH_Ma: req.params.KH_Ma
        };
    
        const [error, document] = await handle(
            GioHang.findOneAndDelete(condition
            )
        );
    
        if (error) {
            return next(
                new BadRequestError(500,`Không xóa được giỏ hàng của khách hàng có mã ${req.params.KH_Ma}`)
            );
        }
    
        if (!document) {
            return res.send("Khong tim thay gio hang");
        }
    
        return res.send({ message: "Xóa giỏ hàng thành công" });
    
};

