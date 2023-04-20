module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            NV_Ma: {
                type: String,
                required: [true, "Ma nhan vien duoc yeu cau"],
            },
            NV_Ten: {
                type: String,
                required: [true, "ten nhan vien duoc yeu cau"],
            },

            NV_Ho: {
                type: String,
                required: [true, "Ho nhan vien duoc yeu cau"],
            },
            NV_CCCD: {
                type: String,
                required: [true, "CCCD/CMND cua nhan vien duoc yeu cau"],
            },

            NV_NgaySinh: {
                type: Date,
                required: [true, "Ngay sinh nhan vien duoc yeu cau"],
            },
            NV_SDT: {
                type: String,
                required: [true, "SDT nhan vien duoc yeu cau"],
            },
            NV_Email: {
                type: String,
                required: [true, "Dia chi email duoc yeu cau"],
            },

            NV_DiaChi: {
                type: String,
                required: [true, "TDia chi thuong tru duoc yeu cau"],
            },

            NV_MatKhau: {
                type: String,
                required: [true, "Mat khau tai khoan duoc yeu cau"],
            },

            NV_LoaiNV: {
                type: Number,
                required:[true,"Loai nhan vien duoc yeu cau"],
            },

            NV_KhoaTaiKhoan: {
                type: Boolean,
                required: [true, "Tai khoan bi khoa hay khong"]
            },

            NV_GioiTinh: {
                type: Boolean,
                required: [true, "Gioi tinh duoc yeu cau"]
            },

            ownerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            },
        });

    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });


    return mongoose.model("NhanVien", schema);
};