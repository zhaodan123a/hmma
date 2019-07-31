<template>
    <div id="app">
<!-- <div class="ceshi"></div> -->
<!-- 路由缓存，只调用一次钩子函数 -->
      <keep-alive>
      <router-view></router-view>
      </keep-alive>
      </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
// 测试rem适配
// .ceshi{
//   width: 750px;
//   height: 200px;
//   background-color: pink;
// }
</style>
