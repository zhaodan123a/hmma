<template>
  <div>
    <!-- 弹出框组件 -->
    <!-- 点击遮罩层关闭弹窗，不显示确认按钮 -->
    <van-dialog
      :value="value"
      @input="$emit('input')"
      title="标题"
      closeOnClickOverlay
      :show-confirm-button="false"
    >
    内容内容内容内容
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: 'MoreAction',
  // 接收从父组件传入的值
  props: {
    // 这里只是一种新写法，和props:['value']意思一样
    value: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
