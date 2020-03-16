import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex)
const state= {
  cartList: []
}
const store = new Vuex.Store({
  state,
  mutations: {
   /*  addCart(state, payload) {
      //  判断添加的商品，购物车中是否存在
      // let oldProduct = null
      // state.cartList.forEach(v => {
      //   if (v.iid === payload.iid) {
      //     oldProduct = v
      //   }
      // })
      let oldProduct=state.cartList.find(v =>  v.iid===payload.iid)
      // 存在 ，数量加1，不存在就 把是商品添加进购物车并且数量是1
      if (oldProduct) {
        oldProduct.count += 1
      } else {
        payload.count = 1
        state.cartList.push(payload)
      }
    } */
    addCounter(state,payload) {
      payload.count++
    },
    newAdd(state,payload) {
      state.cartList.push(payload)
    }
  },
  actions:{
    addCart(context, payload) {
      //  判断添加的商品，购物车中是否存在
      let oldProduct=context.state.cartList.find(v =>  v.iid===payload.iid)
      // 存在 ，数量加1，不存在就 把是商品添加进购物车并且数量是1
      if (oldProduct) {
        // oldProduct.count += 1
        context.commit('addCounter',oldProduct)
      } else {
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit('newAdd',payload)
      }
    }
  }
  
  
})
export default store
