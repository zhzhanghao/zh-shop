<template>
  <div>
    <HeadNav/>
    <zhanghao><span>订单详情</span></zhanghao>
    <div class="container">
      <div class="page-title-normal">
        <h2 class="page-title-h2"><span>结账</span></h2>
      </div>
      <!-- 进度条 -->
      <div class="check-step">
        <ul>
          <li class="cur"><span>Confirm</span> address</li>
          <li class="cur"><span>View your</span> order</li>
          <li class="cur"><span>Make</span> payment</li>
          <li class="cur"><span>Order</span> confirmation</li>
        </ul>
      </div>

      <div class="order-create">
        <div class="order-create-pic"><img src="/static/img/ok-2.png" alt=""></div>
        <div class="order-create-main">
          <h3>恭喜! <br>你的订单正在处理中!</h3>
          <p>
            <span>订单编号：{{orderId}}</span>
            <span>订单金额：{{orderTotal}}</span>
          </p>
          <div class="order-create-btn-wrap">
            <div class="btn-l-wrap">
              <router-link class="btn btn--m" to="/cart">购物车列表</router-link>
              <!--<a href="javascript:;" class="btn btn&#45;&#45;m">Cart List</a>-->
            </div>
            <div class="btn-r-wrap">
              <router-link class="btn btn--m" to="/">商品列表</router-link>
              <!--<a href="javascript:;" class="btn btn&#45;&#45;m">商品列表</a>-->
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footers></Footers>
  </div>
</template>
<script>
  import HeadNav from '@/components/Head'
  import NavBread from '@/components/NavBread'
  import Footers from '@/components/Footer'
  import Modal from '@/components/Modal'
  export default {
    data(){
      return{
        orderTotal:'',
        orderId:0
      }
    },
    mounted(){
      var orderId=this.$route.query.orderId;
      if(!orderId){
        return;
      }
      this.$http.get("/users/orderDetail",{
        params:{
          orderId:orderId
        }
      }).then(res=>{
        if(res.data.status=='0'){
          this.orderId=orderId;
          this.orderTotal=res.data.result.orderTotal;
        }
      })
    },
    components:{
      HeadNav,
      'zhanghao':NavBread,
      Footers,
      Modal
    },
    methods:{

    }
  }
</script>
