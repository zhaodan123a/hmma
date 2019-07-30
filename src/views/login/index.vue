<template>
  <div>
    <!-- 测试表单验证插件 -->
    <!-- <input v-validate="'required|email'" name="email" type="text">
    <span>{{ errors.first('email') }}</span>-->
    <!-- 导航 -->
    <van-nav-bar title="用户登录" />
    <!-- 表单 -->
    <form action="/">
      <van-cell-group>
        <van-field
          v-validate="'required|phone'"
          name="phone"
          v-model="user.mobile"
          :error-message="errors.first('phone')"
          label="手机号"
          placeholder="请输入用户名"
          required
        />

        <van-field v-model="user.code" type="password" label="短信验证码" placeholder="请输入验证码" required />
      </van-cell-group>
      <van-button type="info" block @click.prevent="comlogin" :loading='loading'>登录</van-button>
    </form>
  </div>
</template>

<script>
// 引入登录请求
import { login } from '@/api/user.js'
export default {
  data () {
    return {
      user: {
        mobile: '18801185985',
        code: '246810'
      },
      loading: false
    }
  },
  methods: {
    comlogin () {
      // 加载效果
      this.loading = true
      this.$validator.validate().then(async valid => {
        // 如果验证失败
        if (!valid) {
          console.log('验证失败')
          this.loading = false
          return
        }
        // 验证通过->发送请求
        try {
          const data = await login(this.user)
          this.loading = false
          // console.log(data) // data里面有token
          this.$store.commit('settoken', data)
          this.$router.push('/')
        } catch (error) {
          console.log(error)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: #3296fa;
  .van-nav-bar__title {
    color: #fff;
  }
}
</style>
