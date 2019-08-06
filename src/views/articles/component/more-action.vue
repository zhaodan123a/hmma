<template>
    <div class="more-action">
        <!-- 更多操作组件 -->
    <van-button icon="star-o" round :loading="false" type="danger">点赞</van-button>

    <van-button icon="delete" round :loading="false" type="danger">不喜欢</van-button>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
.more-action {
  padding: 20px;
  display: flex;
  justify-content: space-around;
}
</style>
