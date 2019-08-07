<template>
  <div>
    <!-- 回复组件 -->
    <van-popup
      v-model="isshow"
      @input="$emit('input',$event)"
      position="bottom"
      :style="{height:'75%'}"
    >
      <van-cell>
        <div slot="icon">
          <img class="avatar" :src="reply_comm.aut_photo" alt />
        </div>
        <div slot="title">
          <span>{{reply_comm.aut_name}}</span>
          <van-tag>楼主</van-tag>
        </div>
        <div slot="default">
          <van-button icon="like-o" size="mini" plain>赞</van-button>
        </div>
        <div slot="label">
          <p>{{reply_comm.content}}</p>
          <p>
            <span>{{reply_comm.pubdate | reltime}}</span>
          </p>
        </div>
      </van-cell>
      <hr />
    <!-- 回复列表 -->

    <!-- 传入评论id和是否是回复列表，需要将评论id转成字符串，否则报错 -->
      <comment-list :source="reply_comm.com_id.toString()" :isArticle="false"></comment-list>
      <!-- 发布回复 -->
      <add-commandrep class="addrep" :target="reply_comm.com_id.toString()" :art_id="articleId"></add-commandrep>
    </van-popup>
  </div>
</template>

<script>
// 引入eventbus
import eventbus from '@/utils/eventBus.js'
// 引入comment-list作为回复列表组件
import CommentList from './comment-list.vue'
// 引入add-commandrep作为发表回复组件
import AddCommandrep from './add-commandrep.vue'
export default {
  components: {
    CommentList,
    AddCommandrep
  },
  props: {
    articleId: {
      type: [String, Number]
    }
  },
  data () {
    return {
      isshow: false,
      // 楼主信息
      reply_comm: {
        // 默认，防止在没有数据时toString报错
        com_id: ''
      }
    }
  },
  mounted () {
    eventbus.$on('reply-success', item => {
      this.reply_comm = item
      this.isshow = true
    })
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
.addrep {
  position: fixed;
  left: 0;
  bottom: 0;
}
</style>
