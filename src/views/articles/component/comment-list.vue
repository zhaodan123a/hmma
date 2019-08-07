<template>
  <div>
    <!-- 评论列表组件 -->
    <van-list v-model="isloading" :finished="isfinished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item,index) in comment" :key="index">
        <div slot="icon">
          <img class="avatar" :src="item.aut_photo" alt />
        </div>
        <div slot="title">
          <span>{{item.aut_name}}</span>
        </div>
        <div slot="default">
          <van-button icon="like-o" size="mini" plain>赞</van-button>
        </div>
        <div slot="label">
          <p>{{item.content}}</p>
          <p>
            <span>{{item.pubdate | reltime}}</span>
            ·
            <span @click="reply(item)">回复</span>
          </p>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
// 引入获取评论请求
import { getreply } from '@/api/articles.js'
// 导入eventbus
import eventbus from '@/utils/eventBus.js'
export default {
  // 考虑到评论组件和回复评论组件列表可以共用一个，所以使用数据来接收
  props: {
    source: {
      // 文章id或者评论id
      type: [String, Number],
      required: true // 表示必须传
    },
    // 是加载评论还是回复
    isArticle: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      // 动画
      isloading: false,
      isfinished: false,
      comment: [],
      // 默认从第几个开始
      offset: null
    }
  },
  computed: {
    articleId () {
      return this.$route.params.articles_id
    }
  },
  // 阻止路由缓存
  deactivated () {
    // this指的是当前vue实例对象
    this.$destroy()
  },
  methods: {
    async onLoad () {
      try {
        const data = await getreply({ istype: this.isArticle,
          source: this.source,
          offset: this.offset,
          limit: 10 })
        console.log(data)
        //   this.comment = data.results
        // 判断是否有数据
        if (!data.results.length) {
          this.isloading = false
          this.isfinished = true
        } else {
        // 有数据，追加数据
          this.comment.push(...data.results)
          // 将offset赋值为上一次的id
          this.offset = data.last_id
          // 关闭和开启相关动画
          this.isloading = false
        }
      } catch (error) {
        console.dir(error)
      }
    },
    // 回复出现弹窗事件
    reply (item) {
      // 向回复组件传评论
      eventbus.$emit('reply-success', item)
    }
  }
}
</script>

<style lang="less" scoped>
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-right: 10px;
}
</style>
