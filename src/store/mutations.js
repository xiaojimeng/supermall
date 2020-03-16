export default{
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
      payload.checked=true
      state.cartList.push(payload)
    }
}