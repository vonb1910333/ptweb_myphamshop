module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            SP_Ma: {
                type: String,
                required: [true, "Ma san pham duoc yeu cau"],
            },
            DMSP_Ma: {
                type: String,
                required: [true, "Ma danh muc duoc yeu cau"],
            },

            TH_Ma: {
                type: String,
                required: [true, "Ma thuong hieu duoc yeu cau"],
            },

            SP_TenSanPham: {
                type: String,
                required: [true, "Ten san pham duoc yeu cau"],
            },

            SP_ThongTin: {
                type: String,
                required: [true, "Thong tin san pham duoc yeu cau"],
            },
            SP_SoLuong: {
                type: Number,
                required: [true, "So luong duoc yeu cau"],
            },
            SP_GiaMuaVao: {
                type: Number,
                required: [true, "Gia mua vao duoc yeu cau"],
            },

            SP_GiaBanRa: {
                type: Number,
                required: [true, "Gia ban ra phai duoc nhap"],
            },
            SP_HinhAnh: {
                type: String,
                required: [true, "Hinh anh san pham duoc yeu cau"],
            },
            ownerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            },               
        });    
        
        // Replace _id with id and remove __V
        schema.method("toJSON", function() {
            const { __v, _id, ...object } = this.toObject();
            object.id = _id;
            return object;
        });


        return mongoose.model("SanPham", schema);  
};