<template>
  <div class="wrapper" ref="a">
    <div class="content">
      <button @click="clickBtn">按钮</button>
      <ul class="li">1</ul>
      <ul class="li">2</ul>
      <ul class="li">3</ul>
      <ul class="li">4</ul>
      <ul class="li">5</ul>
      <ul class="li">6</ul>
      <ul class="li">7</ul>
      <ul class="li">8</ul>
      <ul class="li">9</ul>
      <ul class="li">10</ul>
      <ul class="li">11</ul>
      <ul class="li">12</ul>
      <ul class="li">13</ul>
      <ul class="li">14</ul>
      <ul class="li">15</ul>
      <ul class="li">16</ul>
      <ul class="li">17</ul>
      <ul class="li">18</ul>
      <ul class="li">19</ul>
      <ul class="li">20</ul>
      <ul class="li">21</ul>
      <ul class="li">22</ul>
      <ul class="li">23</ul>
      <ul class="li">24</ul>
      <ul class="li">25</ul>
      <ul class="li">26</ul>
      <ul class="li">27</ul>
      <ul class="li">28</ul>
      <ul class="li">29</ul>
      <ul class="li">30</ul>
      <ul class="li">31</ul>
      <ul class="li">32</ul>
      <ul class="li">33</ul>
      <ul class="li">34</ul>
      <ul class="li">35</ul>
      <ul class="li">36</ul>
      <ul class="li">37</ul>
      <ul class="li">38</ul>
      <ul class="li">39</ul>
      <ul class="li">40</ul>
      <ul class="li">41</ul>
      <ul class="li">42</ul>
      <ul class="li">43</ul>
      <ul class="li">44</ul>
      <ul class="li">45</ul>
      <ul class="li">46</ul>
      <ul class="li">47</ul>
      <ul class="li">48</ul>
      <ul class="li">49</ul>
      <ul class="li">50</ul>
      <ul class="li">51</ul>
      <ul class="li">52</ul>
      <ul class="li">53</ul>
      <ul class="li">54</ul>
      <ul class="li">55</ul>
      <ul class="li">56</ul>
      <ul class="li">57</ul>
      <ul class="li">58</ul>
      <ul class="li">59</ul>
      <ul class="li">60</ul>
      <ul class="li">61</ul>
      <ul class="li">62</ul>
      <ul class="li">63</ul>
      <ul class="li">64</ul>
      <ul class="li">65</ul>
      <ul class="li">66</ul>
      <ul class="li">67</ul>
      <ul class="li">68</ul>
      <ul class="li">69</ul>
      <ul class="li">70</ul>
      <ul class="li">71</ul>
      <ul class="li">72</ul>
      <ul class="li">73</ul>
      <ul class="li">74</ul>
      <ul class="li">75</ul>
      <ul class="li">76</ul>
      <ul class="li">77</ul>
      <ul class="li">78</ul>
      <ul class="li">79</ul>
      <ul class="li">80</ul>
      <ul class="li">81</ul>
      <ul class="li">82</ul>
      <ul class="li">83</ul>
      <ul class="li">84</ul>
      <ul class="li">85</ul>
      <ul class="li">86</ul>
      <ul class="li">87</ul>
      <ul class="li">88</ul>
      <ul class="li">89</ul>
      <ul class="li">90</ul>
      <ul class="li">91</ul>
      <ul class="li">92</ul>
      <ul class="li">93</ul>
      <ul class="li">94</ul>
      <ul class="li">95</ul>
      <ul class="li">96</ul>
      <ul class="li">97</ul>
      <ul class="li">98</ul>
      <ul class="li">99</ul>
      <ul class="li">100</ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      scroll: ""
    };
  },
  methods: {
    clickBtn() {
      console.log("点击了按钮");
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.a, {
      // 默认0 0和1都是不侦测实时位置
      // 2：手指滚动的记录，手指离开后的惯性滚动不侦测，
      // 3 只要是滚动都侦测
      probeType: 3,
      pullUpLoad: true
    });
    // 获取滚动位置
    this.scroll.on("scroll", options => {
      console.log(options);
    });
    //pullingUp事件:滚动到底部就执行。但是只执行一次，所有请求到数据并展示之后。要finishiPullUP()
    // 上拉加载更多
    this.scroll.on("pullingUp", () => {
      console.log("上拉加载更多");
    });
  }
};
</script>

<style scoped>
/* 原生 局部滚动：高度必须确定 */
/* .content{
height: 200px;
background-color: rgba(51, 86, 156, 0.71);
overflow-y: scroll;
} */
.wrapper {
  height: 200px;
  background-color: rgba(51, 86, 156, 0.71);
  overflow: hidden;
}
</style>