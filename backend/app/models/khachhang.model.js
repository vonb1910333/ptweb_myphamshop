module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            // KH_Ma: {
            //     type: String,
            //     required: [true, "Ma san pham duoc yeu cau"],
            // },
            KH_Ten: {
                type: String,
                required: [true, "Ten khach hang duoc yeu cau"],
            },

            KH_NgaySinh: {
                type: Date,
                // required: [true, "Ma thuong hieu duoc yeu cau"],
            },

            KH_Email: {
                type: String,
                required: [false, "Ten san pham duoc yeu cau"],
            },

            KH_DiaChi: {
                type: String,
                required: [false, "Thong tin san pham duoc yeu cau"],
            },
            KH_SDT: {
                type: String,
                required: [true, "So dien thoai duoc yeu cau"],
            },
            KH_MatKhau: {
                type: String,
                required: [true, "Mat khau tai khoan duoc yeu cau"],
            },
            GH_Ma: {
                type: String,
            },

            ownerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "khachhang"
            },               
        });    
        
        // Replace _id with id and remove __V
        schema.method("toJSON", function() {
            const { __v, _id, ...object } = this.toObject();
            object.id = _id;
            return object;
        });


        return mongoose.model("KhachHang", schema);  
};