<template>
  <div>
    <div class="site-header" style="clear:both;">
    <div class="container">
    <div class="header-logo">
    <router-link to="/" title="小米官网"><img src="/static/img/zh-logo.jpg"  style="width: 250px;height:55px;"/></router-link>
    </div>
    <div class="header-nav">
    <ul class="nav-list">

    </ul>
    </div>
    <!-- <div class="container-user"> -->
    <div class="topbar-cart" id="ECS_CARTINFO">
    <router-link class="cart-mini " to="/cart">
    <i class="iconfont">&#xe60c;</i> 购物车
    <span class="mini-cart-num J_cartNum" id="hd_cartnum">(0)</span>
    </router-link>
    </div>
    <div class="topbar-info J_userInfo" id="ECS_MEMBERZONE">
      <span v-text="nickName" v-if="nickName"> </span>
    <a class="link"  rel="nofollow" @click="userFalg=true" v-if="!nickName">登录</a>
    <span class="sep" v-if="nickName">|</span>
    <a class="link"  rel="nofollow" v-if="nickName" @click="loginOut">退出</a>
    <!--</div>-->
     </div>
    </div>
    <div id="J_navMenu" class="header-nav-menu" style="display: none;">
    <div class="container"></div>
    </div>
    </div>
    <!-- 登录框 -->
    <div class="md-modal modal-msg md-modal-transition " :class="{'md-show':userFalg}">
      <div class="md-modal-inner">
        <div class="md-top">
          <div class="md-title">login in</div>
          <button class="md-close">Close</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <div class="error-wrap">
              <span class="error " :class="{'error-show':errorFalg}">用户名或密码错误</span>
            </div>
            <ul>
              <li class="regi_form_input">
                <input type="text" tabindex="1" name="loginname" v-model="userName" placeholder="User Name" data-type="loginname" class="regi_login_input regi_login_input_left">
              </li>
              <li class="regi_form_input noMargin">
                <i class="icon IconPwd"></i>
                <input type="password" tabindex="2" name="password" v-model="userPwd" placeholder="Password" class="regi_login_input regi_login_input_left login-input-no input_text" @keyup.enter="login">
              </li>
            </ul>

          </div>
          <div class="login-wrap">
            <a href="javascript:;" class="btn-login" @click="login">登录</a>
          </div>
        </div>
      </div>
    </div>
    <div :class="{'md-overlay':userFalg}">
    </div>

  </div>
</template>
<script>
//import axios from 'axios'
  export default {
    name:'header',
    data(){
        return{
          userName:'',
          userPwd:'',
          nickName:'',
          userFalg:false,
          errorFalg:false
      }
    },
    mounted(){
      this.checkLogin();
    },
    methods:{
      login(){
        this.$http.post("/users/login",{
          userName:this.userName,
          userPwd:this.userPwd
        }).then(res=>{
          console.log(res);
          if(res.data.status==0){
            this.userFalg=false
            this.nickName=res.data.result
          }else {
            this.errorFalg=true
          }
        })
      },
      checkLogin(){
        this.$http.post("/users/checkLogin").then(res=>{
            console.log(res);
            this.nickName=res.data.result;
          })
      },
      loginOut(){
        this.$http.post("/users/loginOut").then(res=>{
          this.nickName='';
        })
      }
    }
  }
</script>
<style>

</style>
