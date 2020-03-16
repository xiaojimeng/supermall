<template>
  <div id="home">
    <nav-bar class="home-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll
      class="content"
      ref="scroll"
      @scrolly="scrolly"
      :probe-type="3"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <swiper :banners="banners"></swiper>
      <recommend :recommends="recommends"></recommend>
      <feature></feature>
      <tab-control :titles="titles" class="tab-control" @tabClick="tabClick" ref="tabControl"></tab-control>
      <good-list :goods="showGoods"></good-list>
    </scroll>
    <back-top @click.native="clickBack" v-show="isShow"></back-top>

  </div>
</template>

<script>
import NavBar from "components/common/navBar/NavBar";
import tabControl from "components/common/tabControl/TabControl";
import Scroll from "components/common/scroll/Scroll";

import GoodList from "components/content/goods/GoodList";
import BackTop from "components/content/backTop/BackTop";

import Swiper from "./childComps/Swiper";
import Recommend from "./childComps/RecommendView";
import Feature from "./childComps/Feature";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "utils/utils";
import { imgListenerMixin } from "utils/mixin";

export default {
  data() {
    return {
      banners: [],
      recommends: [],
      titles: ["流行", "新款", "精选"],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      // types:[]
      currentType: "pop",
      isShow: false,
      saveY: 0,
      itemImgListener: null
    };
  },
  mixins: [imgListenerMixin],

  components: {
    NavBar,
    tabControl,
    Scroll,
    GoodList,
    BackTop,
    Swiper,
    Recommend,
    Feature
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  methods: {
    tabClick(i) {
      switch (i) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    // 返回顶部
    clickBack() {
      // this.$refs.scroll 拿到scroll组件对象。可以拿到里面的数据，方法等
      // this.$refs.scroll.scroll.scrollTo(0,0);
      this.$refs.scroll.scrollTo(0, 0);
    },
    // 滚动位置
    scrolly(position) {
      this.isShow = -position.y > 1000;
    },
    // 加载更多
    loadMore() {
      // console.log("loading");
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.refresh();
    },

    /*#############网络请求  */
    //商品
    getHomeGoods(type) {
      let _this = this;
      let page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        let data = res.data;
        _this.goods[type].list.push(...data.list);
        _this.goods[type].page += 1;
        _this.$refs.scroll.finishPullUp();
      });
    },
    // banners
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        let data = res.data;
        this.banners = data.banner.list;
        this.recommends = data.recommend.list;
      });
    }
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 监听item中图片是否加载完成。完成refresh
    // let refresh = debounce(this.$refs.scroll.refresh, 3000);
    // this.itemImgListener = () => {
    //   refresh();
    // };
    // this.$bus.$on("itemImageLoad", this.itemImgListener);
    // 所有的组件都有一个属性$el ,获取组件中的元素
    // console.log(this.$refs.tabControl.$el.offsetTop);
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 离开时的位置
    this.saveY = this.$refs.scroll.scroll.y;
    // 取消全局事件的监听
    // this.$bus.$off('itemImageLoad',函数)
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  
  }
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
}
.home-bar {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
/* .tab-control {
  position: sticky;
  top: 44px;
} */
.content {
  height: calc(100% - 49px);
  overflow: hidden;
}
</style>