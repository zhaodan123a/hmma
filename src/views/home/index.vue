<template>
  <div>
    <van-nav-bar title="首页" fixed/>
    <!-- 导航栏 -->
    <van-tabs v-model="activetab" class="channels-tab">
      <van-tab title="推荐">
        <!-- 下拉刷新 -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <!-- 列表 -->
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
// 导入频道方法
import { getchannels } from '@/api/channels.js'
export default {
  data () {
    return {
      activetab: 0,
      list: [],
      loading: false,
      finished: false,
      // 下拉刷新
      count: 0,
      isLoading: false,
      // 频道
      channels: []
    }
  },
  created () {
    this.getchannelsall()
  },
  methods: {
    // 列表
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    },
    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
        this.count++;
      }, 500);
    },
    // 获取频道分类
    async getchannelsall () {
        const res = await getchannels()
        console.log(res)
        this.channels = res.channels
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: #3296fa;
  .van-nav-bar__title {
    color: #fff;
  }
}
//tab样式
.channels-tab{
    //显示没有更多的那个文字
    margin-bottom: 100px;
}
//深度作用域,让频道固定定位
.channels-tab /deep/ .van-tabs__wrap{
    position: fixed;
    top: 92px;
    z-index:1;
    width:100%;
}
.channels-tab /deep/ .van-tabs__content{
    padding-top: 168px;
}
</style>
