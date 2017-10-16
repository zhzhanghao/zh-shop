var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var Goods=require('../models/goods');
var User=require('../models/user');
mongoose.connect('mongodb://localhost:27017/shop');
mongoose.connection.on('connected',function () {
    console.log("连接成功")
})
mongoose.connection.on('error',function () {
    console.log("连接失败")
})
mongoose.connection.on('disconnected',function () {
    console.log("连接中断")
})

router.get("/list",function (req,res,next) {
    let sort=req.param('sort');
    let priceLevel=req.param('priceLevel');
    let priceGt='',priceLte='';
    let param={};
    if(priceLevel!=='all'){
        // switch (priceLevel){
        //     case '0':
        //         priceGt=0;
        //         priceLte=100;
        //         break;
        //     case '1':
        //         priceGt=100;
        //         priceLte=500;
        //         break;
        //     case '2':
        //         priceGt=500;
        //         priceLte=1000;
        //         break;
        //     case '3':
        //         priceGt=1000;
        //         priceLte=5000;
        //         break;
        // }
        // 表驱动法
        let priceItem=[[0,100],[100,500],[500,1000],[1000,5000]];
        param={salePrice:
            {
                // $gt:priceGt,
                // $lte:priceLte
                $gt:priceItem[priceLevel][0],
                $lte:priceItem[priceLevel][1]
            }
        }
    }

    let currentPage = (parseInt(req.param('page')) > 0) ? parseInt(req.param('page')) : 1; //第几页
    let pagesize = (parseInt(req.param('pagesize')) > 0) ? parseInt(req.param('pagesize')) : 4; //每页显示多少条

    let skip = (currentPage - 1) * pagesize;
    let goodModel = Goods.find(param).sort({ 'salePrice': sort }).skip(skip).limit(pagesize);

    goodModel.exec({},function (err,doc) {
        console.log(doc);
        res.json({status:0,result:doc})
    })
});

router.post("/addCart",function (req,res,next) {
    //点击添加购物车，调用接口，将数据添加到用户数据里，查询，如果有则数量家1，否则添加进去，
    let productId=req.body.productId;
    let userId=req.cookies.userId;
    if(userId) {


        User.findOne({'userId': userId}, function (err, userDoc) {
            let goodItem = '';
            userDoc.cartList.forEach(function (item) {
                if (item.productId == productId) {
                    console.log("4")
                    item.productNum++;
                    goodItem = item;
                }
            });
            if (goodItem) {
                console.log("5");
                userDoc.save(function (err3, doc3) {
                    if (err3) {
                        res.json({status: "1", msg: err3.message})
                    } else {
                        console.log("6");
                        res.json({status: "0", msg: "", result: "添加商品数量成功"})
                    }
                })
            } else {
                Goods.findOne({'productId': productId}, function (err1, goodDoc) {
                    goodDoc.productNum = "1";
                    goodDoc.checked = '1';
                    userDoc.cartList.push(goodDoc);
                    console.log(goodDoc)
                    userDoc.save(function (err2, doc2) {
                        console.log(2);
                        if (err2) {
                            res.json({status: "1", msg: err2.message})
                            console.log(1)
                        } else {
                            res.json({status: "0", msg: "", result: "添加购物车成功"})
                            console.log(3)
                        }
                        console.log(userDoc.cartList);
                    });

                })
            }
        })
    }else {
        res.json({status:1,msg:'请先登录'})
    }
    });


router.get("/lookCart",function (req,res,next) {
    if(req.cookies.userId){
        User.findOne({userId:req.cookies.userId},function (err,userDoc) {
            if(err){
                res.json({status:1,msg:'请先登录',result:''})
            }else {
                res.json({status:0,msg:'获取购物车列表成功',result:userDoc.cartList});
            }
        })
    }
});

module.exports=router;

