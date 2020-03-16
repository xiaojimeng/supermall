import { debounce } from "utils/utils";
export const imgListenerMixin = {
  mounted() {
    // 监听item中图片是否加载完成。完成refresh
    let refresh = debounce(this.$refs.scroll.refresh, 3000);
    this.itemImgListener=() => {refresh()}
    this.$bus.$on("itemImageLoad", this.itemImgListener);
    // console.log("我是mixin");
    
  },
}
