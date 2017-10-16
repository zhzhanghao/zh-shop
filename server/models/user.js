var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var userSchema=new Schema({
    "userId":String,
    "userPwd":String,
    "userName":String,
    "orderList":Array,
    "cartList":[{
        "productId":String,
        "productName":String,
        "productImage":String,
        "salePrice":Number,
        "productNum":String,
        "checked":String
    }],
    "addressList":[
        {
            "addressId":String,
            "userName":String,
            "streetName":String,
            "postCode":Number,
            "tel":Number,
            "isDefault":Boolean
        }
    ]
});

module.exports=mongoose.model("Users",userSchema)