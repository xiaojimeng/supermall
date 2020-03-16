<template>
  <div class="check-button" :class="{check:isChecked}">
    <img src="~assets/img/cart/tick.svg" alt />
  </div>
</template>

<script>
export default {
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
 
};
</script>

<style scoped>
.check-button {
  border-radius: 50%;
  border: 2px solid #aaa;
}
.check {
  background-color: rgba(248, 102, 126, 0.896);
  border-color: rgba(248, 102, 126, 0.896);
}
</style>