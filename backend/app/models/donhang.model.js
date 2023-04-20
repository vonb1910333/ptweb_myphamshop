module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            NV_Ma: {
                type: String,
                required: [false, "Ma nhan vien duoc yeu cau"],
            },

            KH_Ma: {
                type: String,
                required: [true, "Ma khach hang duoc yeu cau"],
            },

            HD_SoHD: {
                type: String,
                required: [false, "So hoa don duoc yeu cau"],
            },

            DH_NgayDat: {
                type: Date,
                required: [true, "NGay dat hang duoc yeu cau"],
            },
            DH_TongSoLuong: {
                type: Number,
                required: [true, "Tong so luong san pham duoc yeu cau"],
            },
            DH_TongTien: {
                type: Number,
                required: [true, "Tong tien cua don hang duoc yeu cau"],
            },

            DH_DiaChiGiaoHang: {
                type: String,
                required: [true, "Dia chi giao hang phai duoc nhap"],
            },
            DH_GhiChu: {
                type: String,
                required: [false, "Nhu cau"],
            },
            DH_TrangThai: {
                type: String,
                required: [true, "Trang thai don hang phai duoc yeu cau"],
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


        return mongoose.model("DonHang", schema);  
};