module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            DH_Ma: {
                type: String,
                require: [true, "Ma Don hang duoc yeu cau"],
            },
            HD_NgayLap: {
                type: Date,
                required: [true, "Ngay lap hoa don duoc yeu cau"],
            },
            HD_ThoiGianLap: {
                type: String,
                require: [true, "Thoi gian lap hoa don duoc yeu cau"],
            },
            HD_TongTien: {
                type: Number,
                required: [true, "Tong tien hoa don duoc yeu cau"],
            },

        });    
        
        // Replace _id with id and remove __V
        schema.method("toJSON", function() {
            const { __v, _id, ...object } = this.toObject();
            object.id = _id;
            return object;
        });


        return mongoose.model("hoadon", schema);  
};