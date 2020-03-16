export default {
  addCart(context, payload) {
    //  判断添加的商品，购物车中是否存在
    let oldProduct = context.state.cartList.find(v => v.iid === payload.iid)
    // 存在 ，数量加1，不存在就 把是商品添加进购物车并且数量是1
    return new Promise((resolve, reject) => {
      if (oldProduct) {
        // oldProduct.count += 1
        context.commit('addCounter', oldProduct)
        resolve()
      } else {
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit('newAdd', payload)
        resolve()
      }
    })

  }
}
