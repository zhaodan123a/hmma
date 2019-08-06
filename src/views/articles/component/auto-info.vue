<template>
<!-- 作者信息组件 -->
    <div class="auth-info">
    <div class="base-info">
      <img class="avatar" src="https://img.yzcdn.cn/vant/logo.png" alt="">
      <div>
        <p>{{article.aut_name}}</p>
        <!-- 使用过滤器处理时间 -->
        <p>{{article.pubdate | reltime}}</p>
      </div>
    </div>
    <div>
      <van-button :type="article.is_followed?'danger':'default'" @click="handleuser(article.aut_id)" :loading="isloading">{{article.is_followed?'关注':'已关注'}}</van-button>
    </div>
  </div>
</template>

<script>
// 引入关注请求
import { havefollow, unfollow } from '@/api/articles.js'
export default {
  props: {
    // 接收父组件传过来的数据
    article: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      // 按钮动画
      isloading: false
    }
  },
  methods: {
    // 点击关注事件(传入作者id)
    async handleuser (id) {
      // 开启动画
      this.isloading = true
      // 判断是否关注了
      if (this.article.is_followed) {
        // 已经关注了，需要取消关注
        await unfollow(id)
        this.article.is_followed = false
      } else {
        // 没有关注，需要关注
        await havefollow(id)
        this.article.is_followed = true
      }
      this.isloading = false
    }
  }
}
</script>

<style lang="less" scoped>
.auth-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 26px;
  .base-info {
    display: flex;
    align-items: center;
  }
  .avatar {
    margin-right: 10px;
    width: 100px;
    height: 100px;
    border-radius: 100%;
  }
}
</style>
