<template>
  <div>
    <!-- 搜索结果组件 -->
    <!-- $router.back()是返回上一级 -->
    <van-nav-bar fixed title="搜索结果" left-text="返回" left-arrow @click-left="$router.back()"></van-nav-bar>
    <van-list
      class="search-list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onload"
    >
      <van-cell v-for="(item) in searchResult" :key="item.art_id" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
// 引入获取搜索结果请求
import { getsearchResults } from '@/api/search.js'
export default {
  name: 'SearchResults',
  data () {
    return {
      // 动画
      loading: false,
      finished: false,
      // 结果数组
      searchResult: [],
      page: 1,
      per_page: 10
    }
  },
  computed: {
    // 获取传过来的内容
    q () {
      return this.$route.params.content
    }
  },
  created () {
    this.getreaults()
  },
  // 因为使用了keep-alive路由缓存，导致只触发一次created
  // 导致即使是再次搜索内容显示的还是上一次的搜索结果
  // 使用deactivated销毁上一次的组价，即：在keep-alive完成后就销毁
  deactivated () {
    // this指的是当前vue实例对象
    this.$destroy()
  },
  methods: {
    // 搜索结果
    async getreaults () {
      const data = await getsearchResults({
        page: this.page,
        per_page: this.per_page,
        q: this.q
      })
      // console.log(data)
      // this.searchResult = data.results
      return data
    },
    // 动画效果
    async onload () {
      await this.$sleep(800)
      // console.log('111')
      // 调用方法，需要使用await才能收到对象，否则是个promise对象
      const data = await this.getreaults()
      // 判断是否有数据
      // console.log(data)
      if (data.results) {
        // 追加数据
        this.searchResult.push(...data.results)
        // 关闭动画
        this.loading = false
      } else {
        // 显示没有更多动画
        this.finished = true
        this.loading = false
      }
      // 将页数增加
      this.page++
    }
  }
}
</script>

<style lang="less" scoped>
.search-list{
  margin-top: 92px;
}
</style>
