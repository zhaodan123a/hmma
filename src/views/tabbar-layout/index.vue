<template>
  <div>
   <router-view></router-view>
   <!-- 底部导航 -->
   <van-tabbar v-model="active">
  <van-tabbar-item icon="home-o">首页</van-tabbar-item>
  <van-tabbar-item icon="friends-o">我的</van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script>
export default {
  name: "tabbar",
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
