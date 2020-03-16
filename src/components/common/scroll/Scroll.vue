<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      scroll: null,
      message: "哈哈哈"
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 返回顶部
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);
    },
    // pullingUp事件:滚动到底部就执行。但是只执行一次。用来结束
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    // 重新计算
    refresh() {
      // console.log("防抖refresh");
      this.scroll && this.scroll.refresh();
    }
  },
  mounted() {
    let _this = this;
    // 1、创建BScorll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      // 0,1 :不侦测实时位置
      // 2：手指滚动的记录，手指离开后的惯性滚动不侦测，
      // 3 只要是滚动都侦测
      click: true,
      //此时滚动里面的事件才生效
      pullUpLoad: this.pullUpLoad
    });
    // console.log(this.scroll);

    // 获取滚动位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", position => {
        // console.log(position);
        _this.$emit("scrolly", position);
      });
    }

    //pullingUp事件:滚动到底部就执行。但是只执行一次，所有请求到数据并展示之后。要bscroll对象.finishiPullUP()
    // 上拉加载更多
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // console.log("上拉加载更多");
        this.$emit("pullingUp");
      });
    }
  }
};
</script>

<style>
/* better-scroll的bug出现原因：图片再加载出来之后 scrollerHeight属性没有发生变化。
解决：
1、只要每一张图片加载完成了，就执行一次refresh()
2、如何监听图片是否加载完成： 
原生：img.onload=function() {}
在vue中：@load="方法"   直接给图片绑定load事件
3、调用scroll的refresh()
 */

/* 事件总线
 在main.js中：Vue.prototype.$bus=new Vue()
 this.$bus.$emit('aa') 把事件aa 发送到 事件总线里面
 this.$bus.$on('aa',function() {}) 监听事件总线中接受到的事件aa
  */
</style>