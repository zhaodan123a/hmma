<template>
  <div>
    <!-- 弹出框组件 -->
    <!-- 点击遮罩层关闭弹窗，不显示确认按钮 -->
    <van-dialog
      :value="value"
      @input="$emit('input')"
      closeOnClickOverlay
      :show-confirm-button="false"
    >
      <!-- 内容 -->
      <van-cell-group v-if="!showtwo">
        <van-cell icon="location-o" title="不感兴趣" @click="dislikes" />
        <van-cell icon="location-o" title="反馈垃圾内容" is-link @click="showtwo=true" />
        <van-cell icon="location-o" title="拉黑作者" />
      </van-cell-group>
      <van-cell-group v-else>
        <van-cell icon="arrow-left" @click="showtwo=false" />
        <!-- 循环虚拟数据 -->
        <!-- 绑定点击事件 -->
        <van-cell
          icon="location-o"
          :title="item.content"
          v-for="item in reportType"
          :key="item.value"
          @click="selectreport(item.value)"
        />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
// 传入不感兴趣、举报文章的请求
import { unLikeArticles, report } from '@/api/articles.js'
export default {
  name: 'MoreAction',
  // 接收从父组件传入的值
  props: {
    // 这里只是一种新写法，和props:['value']意思一样
    value: {
      type: Boolean,
      default: false
    },
    // 接收父组件传入的选中的文章
    dislikeArticles: {
      type: Object,
      // 因为default声明的只能是基本数据类型，而传入的是一个对象，所以采取下面的方式解决
      // default:()=>{return {}}，可简化成下面的写法
      default: () => {}
    }
  },
  data () {
    return {
      // 是否展示第二个弹窗
      showtwo: false,
      // 虚拟数据
      reportType: [
        { content: '其他问题', value: 0 },
        { content: '标题夸张', value: 1 },
        { content: '低俗色情', value: 2 },
        { content: '错别字多', value: 3 },
        { content: '旧闻重复', value: 4 },
        { content: '广告软文', value: 5 },
        { content: '内容不实', value: 6 },
        { content: '涉嫌违法犯罪', value: 7 },
        { content: '侵权', value: 8 }
      ]
    }
  },
  methods: {
    // 不感兴趣事件
    // 需要使用父组件传入的文章id
    async dislikes () {
      // console.log(this.dislikeArticles)
      const { art_id: articleId } = this.dislikeArticles
      try {
        // 发送请求
        await unLikeArticles(articleId)
        // console.log(111)
        // 因为后台接口没有做相应的效果，此处模拟效果:关闭视图，删除此文章，消息提示
        // 子传父，将此文章删除
        this.$emit('dislike-success')
        // 子传父，关闭对话框
        this.$emit('input', false)
        this.$toast('操作成功！')
      } catch (error) {
        console.dir(error)
      }
    },
    async selectreport (index) {
      try {
        await report({ articleId: this.dislikeArticles.art_id, type: index })

        // 和上面的情况一样，子传父将对话框关闭
        // 子传父，将信息输出
        this.$emit('report-success')
        // 子传父，关闭对话框
        this.$emit('input', false)
        this.$toast('举报成功！')
      } catch (error) {
        // 如果返回的状态码是409（文档），则说明该文章已经被举报过了
        if (error.response.status === 409) {
          this.$emit('input', false)
          this.$toast('已被举报过')
        } else {
          this.$emit('input', false)
          this.$toast('举报失败！')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
