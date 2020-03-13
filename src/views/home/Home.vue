<template>
  <div class="home">
    <nav-bar class="home-bar">
      <div slot="center">购物街</div>
    </nav-bar>
   <swiper :banners="banners"></swiper>
  </div>
</template>

<script>
import NavBar from "components/common/navBar/NavBar";
import Swiper from "./childComps/Swiper";

import { getHomeMultidata } from "network/home";

export default {
  data() {
    return {
      banners: [],
      recommends: []
    };
  },
  components: {
    NavBar,
    Swiper,
  },
  methods: {},
  created() {
    getHomeMultidata().then(data => {
      this.banners = data.banner.list;
      this.recommends = data.recommend.list;
      console.log(data);
    });
  }
};
</script>

<style scoped>
.home-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>