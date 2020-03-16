import Vue from 'vue'
import VueRouter from 'vue-router'

const Main = () => import('views/Main')
const Home = () => import('views/home/Home')
const Cart = () => import('views/cart/Cart')
const Category = () => import('views/category/Category')
const Profile = () => import('views/profile/Profile')
const BetterScroll = () => import('views/BetterScroll')
const Detail = () => import('views/detail/Detail')


// 安装插件
Vue.use(VueRouter)
// 创建路由对象
const routes = [{
    path: '/',
    component: Main,
    redirect: '/home',
    children: [{
        path: '/home',
        component: Home
      },
      {
        path: '/cart',
        name:'cart',
        component: Cart
      }, {
        path: '/category',
        component: Category
      }, {
        path: '/profile',
        component: Profile
      }
    ]
  },
  {
    path: '/detail',
    name: 'detail',
    component: Detail
  },
  {
    path: '/scroll',
    component: BetterScroll
  },
]
const router = new VueRouter({
  routes,
  mode: 'history'
})
export default router
