var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var productSchema=new Schema({
    "productId":String,
    "productName":String,
    "productImage":String,
    "salePrice":Number,
    "productNum":String,

});

module.exports=mongoose.model("Goods",productSchema)