<template>
  <div class="recommend">
    <div v-for="(v,i) in recommends" :key="i" class="item">
      <a :href="v.link">
        <img :src="v.image" alt />
        <div>{{v.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommends: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped>
.recommend{
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 20px;
  border-bottom: 10px solid #eee;
}
.recommend .item {
  flex: 1;
}
img{
width: 70px;
height: 70px;
margin-bottom: 10px;
}
</style>