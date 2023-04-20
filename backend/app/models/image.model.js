module.exports = mongoose => {
     const schema = mongoose.Schema(
         {
             filename: {
                 type: String,
                 require: [true, "Ma Don hang duoc yeu cau"],
             },

 
         });    
         
         // Replace _id with id and remove __V
         schema.method("toJSON", function() {
             const { __v, _id, ...object } = this.toObject();
             object.id = _id;
             return object;
         });
 
 
         return mongoose.model("image", schema);  
 };