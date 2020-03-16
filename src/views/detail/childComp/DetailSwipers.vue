<template>
    <swiper class="box">
      <swiper-item v-for="(v,i) in topImages" :key="i">
        <img :src="v" alt />
      </swiper-item>
    </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";
export default {
  props: {
    topImages: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
};
</script>

<style scoped>
.box{
  height: 300px;
  overflow: hidden;
}

</style>