module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            DM_Ma: {
                type: String,
                required: [true, "Ma danh duoc yeu cau"],
            },

            DM_Ten: {
                type: String,
                required: [true, "Ten danh muc duoc yeu cau"],
            },  
        });    
        
        // Replace _id with id and remove __V
        schema.method("toJSON", function() {
            const { __v, _id, ...object } = this.toObject();
            object.id = _id;
            return object;
        });


        return mongoose.model("DanhMuc", schema);  
};