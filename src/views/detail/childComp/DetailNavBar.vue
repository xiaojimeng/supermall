<template>
  <div>
    <nav-bar>
      <div slot="left" @click="clickBack">
        <img src="~assets/img/common/back.svg" alt />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(v,i) in titles"
          :key="i"
          class="title-item"
          :class="{active:i===currentIndex}"
          @click="clickTitle(i)"
        >{{v}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navBar/NavBar";

export default {
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  components: {
    NavBar
  },
  methods: {
    clickTitle(i) {
      this.currentIndex = i;
      this.$emit('clickTitle',i)
    },
    clickBack() {
      this.$router.back()
    }
  }
};
</script>

<style scoped>
.title {
  display: flex;
  font-size: 13px;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.left img{
  margin-top: 12px;
}
</style>