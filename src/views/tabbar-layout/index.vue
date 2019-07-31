<template>
  <div>
    <!-- 路由缓存，只调用一次钩子函数，缓存已经加载好的内容 -->
   <keep-alive>
   <router-view></router-view>
   </keep-alive>
   <!-- 底部导航 -->
   <van-tabbar v-model="active">
  <van-tabbar-item icon="home-o">首页</van-tabbar-item>
  <van-tabbar-item icon="friends-o">我的</van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'tabbar',
  data () {
    return {
      active: 0
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>

</style>
