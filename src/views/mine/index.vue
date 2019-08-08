<template>
    <div>
        <!-- 我的和未登录-->
      <un-login v-if="!$store.state.user" ></un-login>
      <!-- 将信息传给用户信息页 -->
    <user-info v-else :user="user"></user-info>
    </div>
</template>

<script>
// 引入当前用户信息
import { getuserinfo } from '@/api/user.js'
// 引入子组件（未登录和用户信息）
import UnLogin from './component/un-login.vue'
import UserInfo from './component/user-info.vue'

export default {
  components: {
    UnLogin,
    UserInfo

  },
  data () {
    return {
      // 当前用户信息
      user: {}

    }
  },
  created () {
    // 如果用户登录了再获取
    if (this.$store.state.user) {
      this.getuser()
    }
  },
  methods: {
    // 获取用户信息
    async getuser () {
      const data = await getuserinfo()
      //   console.log(data)
      this.user = data
    }
  }
}
</script>

<style lang="less" scoped>
</style>
