<template >
  <!-- <div> -->
    <div class="tab-control">


      <div
        v-for="(v,i) in titles"
        :key="i"
        class="tab-control-item"
        :class="{active:i===currentIndex}"
        @click="clickItem(i)"
      >
        <span>{{v}}</span>
      </div>
    </div>
    <!-- <div class="tab-content">
      <slot name="tab-content"></slot>
    </div> -->
  <!-- </div> -->
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0
    };
  },
  props: {
    titles: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    clickItem(i) {
      this.currentIndex = i;
      this.$emit("tabClick", i);
    }
  }
};
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  background-color: #fff;
  z-index: 9;
}
.tab-control-item {
  flex: 1;
  height: 40px;
  line-height: 40px;
}
.active span {
  color: var(--color-high-text);
  border-bottom: 3px solid var(--color-high-text);
  padding-bottom: 5px;
}
</style>