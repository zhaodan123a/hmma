<template>
    <div class="add-commandrep">
        <!-- 发布组件（发布评论或者发布回复） -->
 <div class="input-wrap">
      <input type="text" v-model="content">
    </div>
    <div class="more-wrap">
      <van-button size="small" type="info" :disabled="!content.length" @click="handleAdd">发布</van-button>
    </div>
    </div>
</template>

<script>
// 引入添加评论
import { addcomm } from '@/api/articles.js'
export default {
  name: 'AddCommandrep',
  props: {
    // 接收文章或者评论id
    target: {
      type: [String, Number],
      required: true
    },
    // 文章id
    art_id: {
      type: [String, Number],
      default: null
    }
  },
  data () {
    return {
      content: ''
    }
  },
  methods: {
    // 发布
    async handleAdd () {
      const data = await addcomm({ content: this.content, target: this.target, art_id: this.articleId })
      console.log(data)
    }
  }
}
</script>

<style lang="less" scoped>
.add-commandrep{
  width: 100%;
  background: #fff;
  padding: 20px;
  border-top: 2px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .input-wrap {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 20px;
    height: 60px;
    display: flex;
    align-items: center;
    width: 50%;
    input {
      border: none;
      color: #999;
      font-size: 30px;
    }
  }
  .more-wrap {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
  }
}
</style>
