<template>
    <div class="not-login" v-if="!$store.state.user">
        <!-- 未登录 -->
         <div class="circle" @click="$router.push({ name: 'login', query: { redirect: '/my' } })">
      <span>登录</span>
    </div>
    </div>
</template>

<script>
export default {
  name: 'UnLogin'
}
</script>

<style lang="less" scoped>
.not-login {
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  .circle {
    width: 100px;
    height: 100px;
    padding: 40px;
    background-color: red;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 40px;
  }
}
</style>
