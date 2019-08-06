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
            <span>回复</span>
          </p>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
// 引入获取评论请求
import { getreply } from '@/api/articles.js'
export default {
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
  methods: {
    async onLoad () {
      const data = await getreply({ article_id: this.articleId, offset: this.offset })
      console.log(data)
      //   this.comment = data.results
      // 判断是否有数据
      if (data.results.length) {
        // 有数据，追加数据
        this.comment.push(...data.results)
        // 将offset赋值为上一次的id
        this.offset = data.last_id
        // 关闭和开启相关动画
        this.isloading = false
      } else {
        this.isloading = false
        this.isfinished = true
      }
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
