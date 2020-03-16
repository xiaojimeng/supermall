<template>
  <div id="detail">
    <detail-nav-bar @clickTitle="clickTitle" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scrolly="scrolly" :probe-type="3">
      <detail-swipers :top-images="topImages"></detail-swipers>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <good-list :goods="recommends" ref="recommend"></good-list>
    </scroll>
    <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
    <back-top @click.native="clickBack" v-show="isShow"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./childComp/DetailNavBar";
import DetailSwipers from "./childComp/DetailSwipers";
import DetailBaseInfo from "./childComp/DetailBaseInfo";
import DetailShopInfo from "./childComp/DetailShopInfo";
import DetailGoodsInfo from "./childComp/DetailGoodsInfo";
import DetailParamInfo from "./childComp/DetailParamInfo";
import DetailCommentInfo from "./childComp/DetailCommentInfo";
import DetailBottomBar from "./childComp/DetailBottomBar";
import BackTop from "components/content/backTop/BackTop";

import Scroll from "components/common/scroll/Scroll";
import GoodList from "components/content/goods/GoodList";

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam
} from "network/detail";
import { debounce } from "utils/utils";
import { imgListenerMixin } from "utils/mixin";
export default {
  name: "Detail",
  data() {
    return {
      isShow: false,
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      recommendList: [],
      itemImgListener: null,
      topYs: [],
      getTopys: null,
      currentIndex: 0
    };
  },
  mixins: [imgListenerMixin],
  components: {
    DetailNavBar,
    DetailSwipers,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodList,
    BackTop
  },
  methods: {
    // 图片是否加载完成，完成就refresh
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getTopys();
    },
    // 点击标题滚动到指定区域
    clickTitle(i) {
      // console.log(i);
      this.$refs.scroll.scrollTo(0, -this.topYs[i], 200);
    },
    // 滚动到指定区域，标题变亮
    scrolly1(position) {
      //没有加入最大值
      const positionY = -position.y;
      // positionY与topsY进行对比
      let length = this.topYs.length;
      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            positionY >= this.topYs[i] &&
            positionY < this.topYs[i + 1]) ||
            (i === length - 1 && positionY >= this.topYs[i]))
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
    scrolly(position) {
      this.isShow = -position.y > 500;
      const positionY = -position.y;
      let length = this.topYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.topYs[i] &&
          positionY < this.topYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
    // 返回顶部
    clickBack() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    // 添加购物车
    addCart() {
      // 1、获取商品信息
      const product = {};
      product.iid = this.iid;
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice
      // 2、把商品添加到购物车数组中
     // 3、添加到购物车之后，添加后提示购物车成功

      // this.$store.commit('addCart',product)
      this.$store.dispatch('addCart',product).then(res => {
        this.$toast.show("商品添加购物车成功",2000)
      })
    }
  },
  created() {
    this.iid = this.$route.query.iid;
    getDetail(this.iid).then(res => {
      let data = res.result;
      // 轮播图
      this.topImages = data.itemInfo.topImages;
      // 商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 店铺
      this.shop = new Shop(data.shopInfo);
      // 商品详情
      this.detailInfo = data.detailInfo;
      // 商品参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //  评论
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    // 推荐
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });

    // 获取指定区域的offsetTop
    this.getTopys = debounce(() => {
      this.topYs = [];
      this.topYs.push(0);
      this.topYs.push(this.$refs.param.$el.offsetTop);
      this.topYs.push(this.$refs.comment.$el.offsetTop);
      this.topYs.push(this.$refs.recommend.$el.offsetTop);
      this.topYs.push(Number.MAX_VALUE);
      // console.log(this.topYs);
    });
    // 这样拿到的也不对
    // this.$nextTick(() => {
    // this.topYs.push(0);
    // this.topYs.push(this.$refs.param.$el.offsetTop);
    // this.topYs.push(this.$refs.comment.$el.offsetTop);
    // this.topYs.push(this.$refs.recommend.$el.offsetTop);
    // console.log(this.topYs);
    // });
  },
  mounted() {
    // 监听item中图片是否加载完成。完成refresh
    // let refresh = debounce(this.$refs.scroll.refresh, 3000);
    // this.itemImgListener = () => {
    //   refresh();
    // };
    // this.$bus.$on("itemImageLoad", this.itemImgListener);
  },
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  }
};
</script>

<style scoped>
#detail {
  height: 100vh;
}
.content {
  height: calc(100% - 93px);
  /* 滚动区域的高度时可视区域高度减去导航栏和底部工具栏 */
  overflow: hidden;
}
</style>