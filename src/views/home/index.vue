<template>
  <div>
    <van-nav-bar title="首页" fixed />
    <!-- 导航栏 -->
    <van-tabs v-model="activetabIndex" class="channels-tab">
      <!-- 频道 -->
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <!-- 下拉刷新 -->
        <van-pull-refresh v-model="item.downpullLoading" @refresh="onRefresh">
          <!-- 列表 -->
          <van-list
            v-model="item.uppullLoading"
            :finished="item.upFinished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="item in activetab.articles"
              :key="item.art_id.toString()"
              :title="item.title"
            >
              <template slot="label">
                <!-- 图片 -->
                <!-- 当图片数量是0时会隐藏（false） -->
                <van-grid v-show="item.cover.type !==0" :border="false" :column-num="3">
                  <van-grid-item v-for="src in item.cover.images" :key="src">
                    <!-- 图片懒加载，配合文档lazyload使用 -->
                    <van-image :src="src" lazy-load />
                  </van-grid-item>
                </van-grid>
                <!-- 内容 -->
                作者：
                <span>{{item.aut_name}}</span>&nbsp;
                评论：
                <span>{{item.comm_count}}</span>&nbsp;
                时间：
                <span>{{item.pubdate | reltime }}</span>&nbsp;
                <!-- x图标，点击时会弹出框，内容是拉黑或者追评等 -->
                <!-- 传入点击的文章 -->
                <van-icon name="close" @click="isshowdialog(item)" />
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <!-- 弹出框标签 -->
    <!-- 将父组件数据传到子组件 v-model绑定的是布尔值-->
    <!-- 需要传入选中的文章unlikeArticles -->
    <!-- dislike-success是接收子组件传入，不感兴趣后将此文章删除 -->
    <!-- report-success是接收子组件传入，举报后将此系信息输出 -->
    <more-action
      v-model="isshowaction"
      :dislikeArticles="dislikeArticles"
      @dislike-success="handledislike"
      @report-success="handlereport"
    ></more-action>
  </div>
</template>

<script>
// 导入频道方法
import { getchannels } from '@/api/channels.js'
// 导入获取文章列表方法
import { getarticles } from '@/api/articles.js'
// 引入mapState
import { mapState } from 'vuex'
// 引入弹窗组件
import MoreAction from './more-action.vue'
export default {
  components: {
    MoreAction
  },
  data () {
    return {
      // 频道数组下标
      activetabIndex: 0,
      // list: [],
      loading: false,
      finished: false,
      // 下拉刷新
      count: 0,
      isLoading: false,
      // 频道
      channels: [],
      // 弹出框开与关
      isshowaction: false,
      // 传入子组件的选中的文章
      dislikeArticles: null
    }
  },
  created () {
    // 获取频道
    this.getchannelsall()
  },
  computed: {
    ...mapState(['user']),
    // 所在频道的数据{id,name,timestamp}
    activetab () {
      return this.channels[this.activetabIndex]
    }
  },
  watch: {
    // 监听是否登录（因为使用了路由缓存，导致即使不登录也会访问到之前登录过的内容）
    user (newdata, olddata) {
      // 登录发生变化，重新渲染频道和文章
      this.getchannelsall()
      // 需要手动进行重置上拉的动画，激活频道列表数据（此时因为内部不会自动置为true，需手动置为true）
      this.activetab.uppullLoading = true
      this.getarticlesList()
    }
  },
  methods: {
    // 获取频道新闻推荐，一次获取10条
    async getarticlesList () {
      // 别名,从计算属性中得到当前所处的频道
      // console.log(this.activetab)
      // 返回的是前一次的时间戳，内容数组，因为这时的时间戳是现在，而现在并没有新的数据，所以数组是空的
      // 将历史时间戳传入重新请求
      const { id: channelId, timestamp } = this.activetab
      const data = await getarticles({
        channelId,
        timestamp /* : Date.now() */,
        withTop: 1 // 包含置顶
      })
      return data
    },
    // 列表事件
    async onLoad () {
      // 让加载中动画停留时间长一些
      await this.$sleep(800)
      let data = []
      // 新闻推荐列表
      data = await this.getarticlesList()
      // 第一次请求数组中没有数据
      // console.log(data)
      // 传时间戳时判断数组中是否有数据，如果没有让时间戳赋值为历史时间戳
      if (data.pre_timestamp && data.results.length === 0) {
        this.activetab.timestamp = data.pre_timestamp
        // 重新请求
        data = await this.getarticlesList()
        // 此时已经有数据
        // console.log(data)
      }
      // 控制加载的动画
      if (!data.pre_timestamp && !data.results.length) {
        // 没有数据时显示已加载完毕
        this.activetab.upFinished = true
        // 内部会自动置为true
        this.activetab.uppullLoading = false
      }
      // 更新时间戳
      this.activetab.timestamp = data.pre_timestamp
      // 保存数据   ...表示将data.results展开
      this.activetab.articles.push(...data.results)
      // 取消上拉动画
      this.activetab.uppullLoading = false
    },
    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.activetab.downpullLoading = false
        this.count++
      }, 500)
    },
    // 获取频道分类
    async getchannelsall () {
      // 首先判断是否登录，登录后请求数据,没有登录先判断本地是否有数据，有则加载，没有则进行请求
      // 登录后有9个频道，没登录有7个频道
      const user = this.user
      // 获取本地
      const ischannels = JSON.parse(window.localStorage.getItem('channels'))
      // 没登录&&有本地数据
      if (!user && ischannels) {
        this.channels = ischannels
      } else if ((!user && !ischannels) || user) {
        // 未登录没有本地数据或者已经登录
        const res = await getchannels()
        // 要满足符合条件的channels结构，在当前channels上手动添加加载状态布尔值
        // 切换频道时，每个频道的动画都是由自己决定的，所以需要在频道上加各个动画的属性
        res.channels.forEach(item => {
          (item.articles = []), // 存放当前频道的文章列表
          (item.downpullLoading = false), // 下拉刷新的动画
          (item.uppullLoading = false), // 上拉刷新的状态
          (item.upFinished = false) // 加载完毕的动画
          item.timestamp = Date.now() // 时间戳
        })
        // console.log(res)
        this.channels = res.channels
      }
    },
    // 出现弹出窗事件
    isshowdialog (selectArticles) {
      // 将选中的文章赋值
      this.dislikeArticles = selectArticles
      // console.log(this.dislikeArticles)
      this.isshowaction = true
    },
    // 不感兴趣子传父，对话框关闭并删除指定文章
    handledislike () {
      // 因为接口不完善，所以此处制作一个虚拟删除
      // 使用findIndex筛选出符合条件的索引
      const dex = this.activetab.articles.findIndex(item => {
        return item === this.dislikeArticles
      })
      // 将选中的文章剔除
      this.activetab.articles.splice(dex, 1)
    },
    // 举报处理事件
    handlereport () {
      console.log('举报成功！')
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
.channels-tab {
  //显示没有更多的那个文字
  margin-bottom: 100px;
}
//深度作用域,让频道固定定位
.channels-tab /deep/ .van-tabs__wrap {
  position: fixed;
  top: 92px;
  z-index: 1;
  width: 100%;
}
.channels-tab /deep/ .van-tabs__content {
  padding-top: 170px;
}
</style>
