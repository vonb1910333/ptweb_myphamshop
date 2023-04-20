const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const ThuongHieu = db.ThuongHieu;

//*-------------Create a brand 
exports.create = async(req,res) => {
    //validate request
    if(!req.body.TH_Ma){
        return next(new BadRequestError(400, "Mã thương hiệu không được bỏ trống!"));
    }
    if(!req.body.TH_Ten){
        return next(new BadRequestError(400, "Tên thương hiệu không được bỏ trống!"));
    }
    if(!req.body.TH_XuatXu){
        return next(new BadRequestError(400, "Xuat xứ thương hiệu không được bỏ trống!"));
    }
    // Create a brand
    const thuonghieu = new ThuongHieu({
        TH_Ma: req.body.TH_Ma,
        TH_Ten: req.body.TH_Ten,
        TH_XuatXu: req.body.TH_XuatXu,
        ownerId: req.userId,
    });
    // Save brand in the DB
    const [error, document] = await handle(thuonghieu.save());

    if(error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình tạo thương hiệu!")
        );
    }
    return res.send(document);
};


//*--------Retrive all brand  of store from the database
exports.findAll = async(req,res) => {
    const condition = { ownerId: req.userId };
    const TH_Ten = req.query.TH_Ten;
    if(TH_Ten) {
        condition.TH_Ten = { $regex: new RegExp(TH_Ten), $options: "i"};
    }

    const [error, documents] = await handle(
        ThuongHieu.find(condition, '-ownerId')
    );

    if(error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất thương hiệu với mã ${req.params.TH_Ma}`)
        );
    }

    return res.send(documents);
};

//*-------Find a single brand with an id
exports.findOne = async (req,res) => {
    // console.log(req.params.TH_Ma)
    const condition = {
        TH_Ma: req.params.TH_Ma,       
    };
    const [error, documents] = await handle(
        ThuongHieu.findOne(condition)
    );
    if(error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất sản phẩm!")
        );
    }
    if(!documents){
        return res.send("Khong tim thay")
    }
    return res.send(documents);
};

//*-----Update a brand by the is in the request
exports.update = async (req, res) =>{
   if(!req.body){
        return next(
            new BadRequestError(400, "Dữ liệu cập nhật thuong hiệu không thể trống!")
        );
   }

   const condition = {
    _id: res.params.id,
    ownerId: req.userId,
   };

   const [error, document] = await handle(
        ThuongHieu.findOneAndUpdate(condition, req.body, {
            new: true,
            projection: "-ownerId",
        })
   );
   if (error) {
    return next(
        new BadRequestError(500,`Lỗi trong quá trình cập nhật thương hiệu có mã id=${req.params.id}`
        )
    );
}

if (!document) {
    return next(new BadRequestError(404, "Không tìm thấy thương hiệu!"));
}

return res.send({ message: "Cập nhật thông tin thương hiệu thành công." });
};

//Delete a brand with the specified id in the request
exports.delete = async (req,res) => {    
        const condition = {
            _id: req.params.id,
            ownerId: req.userId,
        };
    
        const [error, document] = await handle(
            ThuongHieu.findOneAndDelete(condition, {
                projection: "-ownerId",
            })
        );
    
        if (error) {
            return next(
                new BadRequestError(500,`Không xóa được thương hiệu có mã ${req.params.id}`)
            );
        }
    
        if (!document) {
            return next(new BadRequestError(404, "Không tìm thấy thương hiệu"));
        }
    
        return res.send({ message: "Xóa thương hiệu thành công" });
    
};

