module.exports = mongoose => {
     const schema = mongoose.Schema(
         {
             KH_Ma: {
                 type: String,
                 required: [true, "Ma khach hang duoc yeu cau"],
             },

             GH_TongSoLuong: {
                 type: Number,
                 required: [true, "Tong so luong san pham duoc yeu cau"],
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
 
 
         return mongoose.model("GioHang", schema);  
 };