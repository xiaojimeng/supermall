# supermall































# Vuex(状态管理)
- 使用地方：用户的登录状态，用户名称，头像，地理位置。商品的收藏，购物车中的商品等
- 安装 npm i --save vuex
```javascript
// index.js文件
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store =new Vuex.Store({
state,
mutations,
getters,
actions,
modules:{}
})
export default store
//  main.js文件中引入 ：import store from 'xx/index.js' 实例对象中使用store
```
# router
- 安装 npm i --save vue-router
```javascript
// index.js文件
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes=[{path:'',component:xx}]
const router = new VueRouter({
  routes
})
export default router
// main.js中引入 ：import router from 'xx/index.js' 实例对象中使用router
```
# 关于CSS
- vue中导入.css文件:@import .css文件路径 
- :root ->获取根元素html
- 在css中定义使用变量:
  + 定义：--变量名：值
  + 使用：var(--变量)
# 其他补充  
- cli3中设置路径别名：在项目文件下新建一个vue.config.js
- 统一风格样式：.editorconfig文件。如果是图片的地址要在别名前面加 ~
- .vue基本结构 ： vue 空格 回车
-  <%= BASE_URL %>xxx 动态获取路径：表示去当前文件路径去找xxx
## Vue导航守卫
* 全局守卫(main.js文件中)
 - router.beforeEach((to,from,next) => {}) 全局前置守卫，进入路由之前
 - router.beforeResolve((to,from,next) => {}) 全局解析守卫，在beforeRouterEnter调用之后调用
 - router.afterEach((to,form) => {}) 全局后置钩子，进入路由之后
* 路由独享的守卫
 beforeEnetr:(to,from,next) => {},写在routes中的某个路由中
* 路由组件内守卫(写在.vue文件中export default{...})
- beforeRouteEnter(to,from,next) => {} 进入路由前
- beforeRouteUPadte(to,from,next) => {}  路由复用同一个组件时
- beforeRouteLeave(to,from,next) => {} 离开路由时
<!-- 例子 -->
 beforeRouteUpdate(to,from,next){
    console.log(to.name, from.name);
    next();
  },
  beforeRouteUpdate被触发的条件是：当前路由改变，但是该组件被复用的时候。
比如说：argu/fu1到argu/f2这个路由，都复用了arg.vue这个组件，这个时候beforeRouteUpdate就会被触发。可以获取到this实例
* 一个完整的导航解析流程
 - 1、导航被触发。
 - 2、在失活的组件（即将离开的页面组件）里调用离开守卫。 beforeRouteLeave
 - 3、调用全局的 beforeEach 守卫。
 - 4、在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
 - 5、在路由配置里调用（路由独享的守卫） beforeEnter。
 - 6、解析异步路由组件
 - 7、在被激活的组件（即将进入的页面组件）里调用 beforeRouteEnter。
 - 8、调用全局的 beforeResolve 守卫 (2.5+)。
 - 9、导航被确认。
 - 10、调用全局的 afterEach 钩子。所有的钩子都触发完了。
 - 11、触发 DOM 更新。
 - 12、用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。
 - beforeRouteLeave -> beforeEach -> befourRouteUpdate ->beforeRouteEnter ->beforeResolve -> afterEach -> beforeRouteEnter
