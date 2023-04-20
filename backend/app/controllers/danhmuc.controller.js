const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const DanhMuc = db.DanhMuc;


exports.create = async(req,res) => {

    //validate request
    if(!req.body.DM_Ma){
        return next(new BadRequestError(400, "Mã danh mục không được bỏ trống!"));
    }
    if(!req.body.DM_Ten){
        return next(new BadRequestError(400, "Tên danh mục không được bỏ trống!"));
    }

    // Create a category
    const danhmuc = new DanhMuc({
        DM_Ma: req.body.DM_Ma,
        DM_Ten: req.body.DM_Ten,
        ownerId: req.userId,
    });
    // Save category in the DB
    const [error, document] = await handle(danhmuc.save());

    if(error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình tạo danh mục!")
        );
    }
    // res.send({ message: 'create handler'});

    return res.send(document);
};


//*--------Retrive all category  of store from the database
exports.findAll = async(req,res) => {
    const condition = { ownerId: req.userId };
    const DM_Ten = req.query.name;
    if(DM_Ten) {
        condition.DM_Ten = { $regex: new RegExp(DM_Ten), $options: "i"};
    }

    const [error, documents] = await handle(
        DanhMuc.find(condition, '-ownerId').sort({'DM_Ma':1})
    );

    if(error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất danh mục với mã ${req.params.DM_Ma}`)
        );
    }

    return res.send(documents);
};

//*-------Find a single category with an id
exports.findOne = async (req,res) => {
    const condition = {
        DM_Ma: req.params.DM_Ma
    };

    const [error, document] = await handle(
        DanhMuc.findOne(condition)
    );

    if(error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất danh mục!")
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
            new BadRequestError(400, "Dữ liệu cập nhật danh mục không thể trống!")
        );
   }

   const condition = {
    DM_Ma: req.params.DM_Ma,
   };

   const [error, document] = await handle(
        DanhMuc.findOneAndUpdate(condition, req.body, {
            new: true,
            projection: "-ownerId",
        })
   );
   if (error) {
    return next(
        new BadRequestError(500,`Lỗi trong quá trình cập nhật danh muc có mã id=${req.params.DM_Ma}`
        )
    );
}

if (!document) {
    return next(new BadRequestError(404, "Không tìm thấy danh mục!"));
}

return res.send({ message: "Cập nhật thông tin danh mục thành công." });
};

//Delete a category with the specified id in the request
exports.delete = async (req,res) => {    
        const condition = {
            DM_Ma: req.params.DM_Ma
        };
    
        const [error, document] = await handle(
            DanhMuc.findOneAndDelete(condition
            )
        );
    
        if (error) {
            return next(
                new BadRequestError(500,`Không xóa được danh mục có mã ${req.params.DM_Ma}`)
            );
        }
    
        if (!document) {
            return res.send("Khong tim thay danh muc");
        }
    
        return res.send({ message: "Xóa danh mục thành công" });
    
};

