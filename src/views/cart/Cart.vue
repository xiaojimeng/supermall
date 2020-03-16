<template>
  <div id="cart">
    <nav-bar class="cart-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list class="content" :cart-list="cartLists"></cart-list>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navBar/NavBar";
import CartList from "./childComps/CartList";
import BottomBar from "./childComps/BottomBar";

export default {
  computed: {
    cartLength() {
      return this.$store.state.cartList.length;
    },
    cartLists() {
      return this.$store.state.cartList;
    }
  },
  components: {
    NavBar,
    CartList,
    BottomBar
  }
};
</script>

<style scoped>
#cart {
  height: 100vh;
  padding-top: 44px;
}
.cart-bar {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
.content {
  height: calc(100% - 49px);
  overflow: hidden;
}
</style>