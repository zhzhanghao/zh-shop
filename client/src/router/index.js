import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/views/GoodsList'
import Cart from '@/views/Cart'
import Address from '@/views/Address'
import OrderConfirm from '@/views/OrderConfirm'
import OrderSuccess from '@/views/OrderSuccess'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/address',
      name: 'address',
      component: Address
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/orderConfirm',
      name: 'orderConfirm',
      component: OrderConfirm
    },
    {
      path: '/orderSuccess',
      name: 'orderSuccess',
      component: OrderSuccess
    },
    // {
    //   path:'/user/:userId?/:zhanghao?',//?代表可写，也可以不写
    //   component:User
    // }
  ]
})