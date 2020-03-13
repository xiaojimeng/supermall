import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Cart = () => import('views/cart/Cart.vue')
const Category = () => import('views/category/Category.vue')
const Profile = () => import('views/profile/Profile.vue')
const Learn = () => import('views/Learn.vue')

// 安装插件
Vue.use(VueRouter)
// 创建路由对象
const routes = [{
    path: '',
    redirect: '/home'
  }, {
    path: '/home',
    component: Home
  },
  {
    path: '/cart',
    component: Cart
  }, {
    path: '/category',
    component: Category
  }, {
    path: '/profile',
    component: Profile
  }, {
    path: '/learn',
    component: Learn
  }
]
const router = new VueRouter({
  routes,
  mode:'history'
})
export default router
