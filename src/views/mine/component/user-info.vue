<template>
        <!-- 用户信息 -->
        <van-cell-group class="user-info">
    <van-cell class="base-info" is-link :border="false" @click="$router.push({ name: 'user-profile' })">
      <div slot="title">
        <img class="avatar" :src="user.photo" alt="显示头像">
        <span class="title">{{user.name}}</span>
      </div>
    </van-cell>
    <van-grid class="data-info" :border="false">
      <van-grid-item>
        <span class="count">{{user.art_count}}</span>
        <span class="text">头条</span>
      </van-grid-item>
      <van-grid-item>
        <span class="count">{{user.follow_count}}</span>
        <span class="text">关注</span>
      </van-grid-item>
      <van-grid-item>
        <span class="count">{{user.fans_count}}</span>
        <span class="text">粉丝</span>
      </van-grid-item>
      <van-grid-item>
        <span class="count">{{user.like_count}}</span>
        <span class="text">获赞</span>
      </van-grid-item>
    </van-grid>
      <van-cell class="base-info" is-link :border="false" @click="$router.push({ name: 'feedback' })">
      <div slot="title">
        <span class="title">用户反馈</span>
      </div>
    </van-cell>
  </van-cell-group>
</template>

<script>
export default {
  name: 'UserInfo',
  props: {
    // 接收用户信息
    user: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="less" scoped>
.user-info {
  .base-info {
    display: flex;
    align-items: center;
    div {
      display: flex;
      align-items: center;
    }
    .avatar {
      margin-right: 30px;
      width: 100px;
      height: 100px;
      border-radius: 100%;
    }
  }
  .data-info {
    .text {
      font-size: 28px;
    }
    .count {
      font-size: 24px;
    }
  }
}
</style>
