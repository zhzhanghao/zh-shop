var express = require('express');
var router = express.Router();
var User=require("../models/user");
require("./../util/util")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  console.log(1);
    let params={
      userName:req.body.userName,
      userPwd:req.body.userPwd
    };
    User.findOne(params,function (err,doc) {
      console.log(doc)
        console.log(2);
          if(err){
              console.log(3)
            res.json({status:"1",msg:"用户名或密码错误"})
          }else {
              if(doc){
                  res.cookie('userId',doc.userId,{
                      path:'/',
                      maxAge: 1000 * 60 * 60
                  });
                  res.cookie('userName',doc.userName,{
                      path:'/',
                      maxAge: 1000 * 60 * 60
                  });
              console.log(4);
              res.json({status:"0",msg:"登录成功",result:doc.userName})
              }else {
                  res.json({status:"1",msg:"用户名或密码错误"})
              }
          }
    })
});

router.post("/checkLogin",function (req,res,next) {
    if(req.cookies.userId){
      console.log(1)
      res.json({status:'0',msg:'',result:req.cookies.userName})
    }else {
        res.json({status:'0',msg:'未登录',result:''})
    }
});

router.post("/loginOut",function (req,res,next) {
    res.cookie('userId','',{
      path:'/',
        maxAge:-1
    });
    res.json({
        status:'0',
        msg:'退出成功'
    })
});

router.post("/cartList",function (req,res,next) {
    let userId=req.cookies.userId;
    User.findOne({userId:userId},function (err,doc) {
        if(err){
            res.json({
                status:'1',
                msg:err.message,
                result:''
            })
        }else {
            res.json({
                status:'0',
                msg:'',
                result:doc.cartList
            })
        }
    })
});

router.post('/cartEdit',function (req,res,next) {
    let userId=req.cookies.userId,
        productId=req.body.productId,
        productNum=req.body.productNum,
        checked=req.body.checked;
    console.log(checked);
    // console.log(req.body);

    User.update({'userId':userId,'cartList.productId':productId},{"cartList.$.productNum":productNum,"cartList.$.checked":checked},function (err,doc) {
        console.log(doc);
        if(err){
            res.json({
                status:'1',
                msg:err.message
            })
        }else {
            res.json({
                status:'0',
                msg:'',
                result:'修改商品数量成功'
            })
        }
    })
});

router.post('/editCheckAll',function (req,res,next) {
    let userId=req.cookies.userId,
        checkAll=req.body.checkAll;
    User.findOne({'userId':userId},function (err,doc) {
        if(err){
            res.json({
                status:'1',
                msg:err.message,
                result:''
            })
        }else {
            console.log(User);
            doc.cartList.forEach(item=>{
                item.checked=checkAll;
            })
            doc.save(function (err1,doc1) {
                if(err1){
                    res.json({
                        status:'1',
                        msg:err1.message,
                        result:''
                    })
                }else {
                    res.json({
                        status:'0',
                        msg:'',
                        result:'操作成功'
                    })
                }
        })
        }
    })
})

router.post('/cartDel',function (req,res,next) {
    let userId=req.cookies.userId,productId=req.body.productId;
    User.update({userId:userId},{
        $pull: {
            'cartList': {
                'productId': productId
            }
        }
        },function (err,doc) {
        if(err){
            res.json({status:'1',msg:err.message,result:''})
        }else {
            res.json({status:'1',msg:'',result:'商品删除成功'})
        }
    })
})

router.get('/addressList',function (req,res,next) {
    var userId=req.cookies.userId;
    User.findOne({userId:userId},function (err,doc) {
        if(err){
            res.json({status:'1',msg:err.message,result:''})
        }else {
            res.json({status:'1',msg:'',result:doc.addressList})
        }
    })
})

router.post('/setDefault',function (req,res,next) {
    var userId=req.cookies.userId,
        addressId=req.body.addressId;
    if(!addressId){
        res.json({
            status:'1003',
            msg:'addressId is null'
        })
    }else {
        User.findOne({userId:userId},function (err,doc) {
         doc.addressList.forEach(item=>{
             if(item.addressId==addressId){
                 item.isDefault=true;
             }else {
                 item.isDefault=false;
             }
         })
            doc.save(function (err1,doc1) {
           if(err1){
               res.json({
                   status:'1',
                   msg:err1.message,
                   result:''
               })
           }else {
               res.json({
                   status:'0',
                   msg:'',
                   result:'修改默认地址成功'
               })
           }
            })
        })
    }

})

router.post("/payMent",function (req,res,next) {
    var  userId=req.cookies.userId,
        addressId=req.body.addressId,
        orderTotal=req.body.orderTotal;
    User.findOne({userId:userId},function (err,doc) {
        if(err){
            res.json({
                status:'1',
                msg:err.message,
                result:''
            })
        }else {
            var address={},
                goodList=[];
            doc.addressList.forEach(item=>{
                if(item.addressId==addressId){
                    address=item
                }
            })

            doc.cartList.filter(item=>{
                if(item.checked=='1'){
                    goodList.push(item)
                }
            })

            var platForm='622';
            var r1=Math.floor(Math.random()*10)
            var r2=Math.floor(Math.random()*10)
            var sysDate=new Date().Format('yyyyMMddhhmmss');
            var orderId=platForm+r1+r2+sysDate;
            var createDate=new Date().Format('yyyy-MM-dd hh:mm:ss');
            var order={
                orderId:orderId,
                orderTotal:orderTotal,
                addressInfo:address,
                goodList:goodList,
                orderStatus:'10',
                createDate:createDate
            }

            doc.orderList.push(order);
            doc.save(function (err1,doc1) {

                console.log(doc)
              if(err1){
                  res.json({status:'1',msg:err1.message,result:''})
              }  else {
                  res.json({status:'0',msg:'',result:{
                    orderId:order.orderId,
                      orderTotal:orderTotal
                  }
                  })
              }

            })
        }
    })

})

router.get("/orderDetail",function (req,res,next) {
    var userId=req.cookies.userId,
        orderId=req.param("orderId");
    User.findOne({userId:userId},function (err,doc) {
        if(err){
            res.json({status:'1',msg:err1.message,result:''})
        }else {
            var orderList=doc.orderList;
           if(orderList.length>0){
              var orderTotal=0
               orderList.forEach(item=>{
                   if(item.orderId==orderId){
                       orderTotal=item.orderTotal
                   }
               })
               if(orderTotal>0){
                  res.json({
                      status:'0',
                      msg:'',
                      result:{
                          orderId:orderId,
                          orderTotal:orderTotal
                      }
                  })
               }
           } else {
               res.json({status:'1010',msg:'当前用户未创建订单',result:''})
           }
        }
    })
})



module.exports = router;
