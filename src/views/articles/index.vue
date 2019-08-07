<template>
  <div class="article">
    <!-- 导航 -->
    <van-nav-bar title="黑马头条" left-text="返回" left-arrow @click-left="$router.back()"></van-nav-bar>
    <div>
      <!-- 文章标题 -->
      <h2 class="article-title">{{article.title}}</h2>
      <!-- 作者信息 -->
      <auto-info :article="article"></auto-info>
      <!-- 文章内容 -->
      <div class="article-content" v-html="article.content"></div>
      <!-- 更多操作 -->
      <more-action></more-action>
      <!-- 评论列表 -->
      <!-- 传入评论id -->
      <comment-list :source="articlesId"></comment-list>
      <!-- 回复窗口 -->
      <!-- 传输文章id -->
      <reply-list :articleId="articlesId"></reply-list>
      <!-- 发布文章组件 -->
      <!-- 发送文章id -->
      <add-commandrep class="addcomm" :target="articlesId"></add-commandrep>
    </div>
  </div>
</template>

<script>
// 引入子组件
import autoInfo from './component/auto-info.vue'
import CommentList from './component/comment-list.vue'
import MoreAction from './component/more-action.vue'
import ReplyList from './component/reply-list.vue'
import AddCommandrep from './component/add-commandrep.vue'
// 引入获取文章详情
import { getarticlesdetail } from '@/api/articles.js'
export default {
  name: 'articles',
  components: {
    autoInfo,
    CommentList,
    MoreAction,
    ReplyList,
    AddCommandrep
  },
  data () {
    return {
      // 文章详情数据,先写一个默认的数值，防止出现网络慢没有的情况
      article: {
        art_id: 1153511593225486336,
        attitude: -1,
        aut_id: 1,
        aut_name: '娘娘爱你',
        aut_photo: 'http://toutiao.meiduo.site/FiUvarBdvpkRJMPEAICpohKDCC9Q',
        ch_id: 5,
        content: '<p>后台柔荑花柔荑花柔荑花</p>',
        is_collected: false,
        is_followed: false,
        pubdate: '2019-07-23T11:46:09',
        recomments: [],
        title: '太黄让他忽然他'
      },
      // 回复弹窗
      isshowreply: true
    }
  },
  computed: {
    // 获取地址栏中的文章id
    articlesId () {
      return this.$route.params.articles_id
    }
  },
  created () {
    this.getdetail()
  },
  methods: {
    // 获取文章详情
    async getdetail () {
      const data = await getarticlesdetail(this.articlesId)
      console.log(data)
      this.article = data
      console.log(this.article)
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: #0096fa;

  .van-nav-bar__title,
  .van-nav-bar__text,
  .van-icon {
    color: #fff;
  }
}
.article {
  // padding: 20px;
  .article-title {
    font-size: 40px;
    font-weight: 400px;
  }
  .article-content {
    font-size: 20px;
  }
}
.addcomm {
  position: fixed;
  left: 0;
  bottom: 0;
}
</style>
