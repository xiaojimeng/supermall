<template>
  <div class="goods">
    <good-item v-for="(v,index) in goods" :key="index" :good-item="v"></good-item>
  </div>
</template>

<script>
import GoodItem from "./GoodItem";
export default {
  props: {
    goods: {
      type: Array,
      default: () => []
    }
  },
  components: {
    GoodItem
  }
};
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2px;
}
</style>
