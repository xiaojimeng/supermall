<template>
  <div class="bottom-menu">
    <CheckButton class="select-all" :is-checked="checkedAll" @click.native="clickAll"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product">去计算({{checkedCount}})</span>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";

export default {
  name: "BottomBar",
  components: {
    CheckButton
  },
  computed: {
    // 计算选中的商品总价格，保留两位小数
    totalPrice() {
      const cartList = this.$store.state.cartList;
      return cartList
        .filter(item => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.count * parseFloat(item.price);
        }, 0)
        .toFixed(2);
    },
    // 选中的商品的数量
    checkedCount() {
      const cartList = this.$store.state.cartList;
      return cartList
        .filter(item => {
          return item.checked;
        })
        .reduce((count, item) => {
          return count + item.count;
        }, 0);
    },
    // 单选决定全选状态
    checkedAll() {
      const cartList = this.$store.state.cartList;
      return cartList.every(v => v.checked);
    }
  },
  methods: {
    // 全选决定单选状态
    clickAll() {
      const cartList = this.$store.state.cartList;
      // 判断是否有未选中的
      let isAll = cartList.find(item => !item.checked);
      // 有未选中的, 则全部选中
      if (isAll) {
        cartList.forEach(item => {
          item.checked = true;
        });
      } else {
        cartList.forEach(item => {
          item.checked = false;
        });
      }
    }
  }
};
</script>

<style scoped>
.bottom-menu {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 50px;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
  background-color: rgb(245, 245, 245);
}

.bottom-menu .select-all {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 13px;
}

.bottom-menu .total-price {
  margin-left: 15px;
  font-size: 16px;
  color: #666;
}

.bottom-menu .buy-product {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  float: right;
}
</style>
