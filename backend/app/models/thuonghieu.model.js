module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            TH_Ha: {
                type: String,
                required: [true, "Ma thuong hieu duoc yeu cau"],
            },

            TH_Ten: {
                type: String,
                required: [true, "Ten thuong hieu duoc yeu cau"],
            },

            TH_XuatXu: {
                type: String,
                required: [true, "Nguon goc thuong hieu duoc yeu cau"],
            },        
        });    
        
        // Replace _id with id and remove __V
        schema.method("toJSON", function() {
            const { __v, _id, ...object } = this.toObject();
            object.id = _id;
            return object;
        });
        return mongoose.model("ThuongHieu", schema);  
};