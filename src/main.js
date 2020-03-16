import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast/index' //自己封装的插件
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'



Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
//安装toast插件
Vue.use(toast)
// 解决移动端300ms延迟问题
FastClick.attach(document.body)
// 图片懒加载
Vue.use(VueLazyload,{
  loading:require('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
