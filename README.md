# supermall-(vue-cli3练习项目)
## 面试题： vue的响应式原理

##  better-scroll的bug出现原因：图片再加载出来之后 scrollerHeight属性没有发生变化。
- 解决办法：
  + 1、只要每一张图片加载完成了，就执行一次refresh()
  + 2、如何监听图片是否加载完成： 
       原生：img.onload=function() {}
       在vue中：@load="方法"   直接给图片绑定load事件
  + 3、调用scroll的refresh()
## 事件总线
 - 在main.js中：Vue.prototype.$bus=new Vue()
 - this.$bus.$emit('aa',参数) 把事件aa 发送到 事件总线里面
 - this.$bus.$on('aa',function() {}) 监听事件总线中接受到的事件aa 
 ## 刷新频繁的防抖函数处理refresh
 ```javascript
  // -防抖debounce/节流throttle
  debounce(func,delay) {
    let timer=null
    return function(...args) {
     if(timer) clearTimout(timer)
     timer=setTimeout(() => {
     func.apply(this.arges)
     },delay)
    }
  }
 ```
##  tabControl的offsetTop获取分析
 - 思路：滚动的距离大于某个值，就吸顶
 - obj.offsetTop
 - 组件时没有offsetTop的，所有的组件都有一个$el属性：用于获取组件中的元素
 

 ## Home离开是记录状态和位置
 - keep-alive :保持组件状态
 - home的内容保存原来的位置
   离开的时候保存位置saveY，回来的时候把位置设为saveY(离开时的位置)
    - activated(){}
    - deactivated(){}
 - detail页面每次进入都会是不同的iid，需要在keep-alibe标签上 exclude="Detail" 传的是组件名，不是文件名字
# Vue中的mixin(混入)

# 类的继承
class Animal{
  return
}
class Person extends Animal{
  继承Animal到Person里面
}
# 滚动到指定区域，标题点亮。点击标题，滚动到指定区域


# 关于CSS
- vue中导入.css文件:@import .css文件路径 
- :root ->获取根元素html
- 在css中定义使用变量:
  + 定义：--变量名：值
  + 使用：var(--变量)
- position: sticky; top:40px,滚动到该盒子之后位置fixed，距离顶部40px
- calc(100% - 100px)
# 其他补充  
- cli3中设置路径别名：在项目文件下新建一个vue.config.js
- 统一风格样式：.editorconfig文件。如果是图片的地址要在别名前面加 ~
- .vue基本结构 ： vue 空格 回车
-  <%= BASE_URL %>xxx 动态获取路径：表示去当前文件路径去找xxx
- 扩展符
```javascript
const num=[]
 const num1=[1,2,3,4]
 const num2=[5,6,7]
num.push(...num1,)
```
- 组件时不能直接注册事件的@事件.native="xx"
- .native .once
- 返回顶部 scrollTo(0,0)
## better-scroll（让移动端滚动更顺滑，还有一个iscroll）
 安装：npm i --save better-scroll
 导入 : import BScroll from 'better-scroll'
 使用：看BetterScroll.vue文件
## Object.keys(obj)返回一个所有元素为字符串的数组
## 对于复选框的选中，在vue中通过v-model="xx.checked"  给xx添加一个checked属性
## Toast
## 解决移动端300ms延迟问题
 - fastClick
 - 安装 npm i -S fastclick
 - 导入 main.js中 import FastClick from 'fastclick'
 - 调用 FastClick.attach(document.body)
## 图片懒加载
 - 安装 npm i --save-dev vue-lazyload
 - 导入 main.js中 import VueLazyload form 'vue-lazyload'
 - 使用 Vue.use(VueLazyload)
 - 把需要懒加载的图片的src="" 改成 v-lazy
## vw-px css单位转换插件(百度搜：px2rem,px2vm)
 - 安装 npm i postcss-px-to-viewport --save-dev
 - 与src同级目录下，postcss.config.js文件
## nginx-项目在window下的部署
- 下载nginx
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
