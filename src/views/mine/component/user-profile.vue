<template>
    <div>
        <!-- 用户信息编辑页 -->
        <van-nav-bar title="个人信息" left-text="返回" right-text="保存" left-arrow @click-left="$router.back()" @click-right="handleSave" />

    <van-cell-group>
      <van-cell is-link title="头像" @click="selfphoto">
        <div slot="default">
          <img width="30" :src="user.photo" alt="">
        </div>
      </van-cell>
      <van-cell is-link title="昵称" :value="user.name" />
      <van-cell is-link title="介绍" value="内容" />
    </van-cell-group>

    <van-cell-group>
      <van-cell is-link title="性别" :value="user.gender === 0 ? '男' : '女'" />
      <van-cell is-link title="生日" :value="user.birthday" />
    </van-cell-group>
    <!-- 上传组件 -->
    <!-- photobase64是接收base64格式图片 -->
    <!-- upload-success是接收普通格式图片 -->
    <upload-photo v-model="isshowphoto" @photobase64="base64photo" @upload-success="handlephoto"></upload-photo>
    </div>
</template>

<script>
// 引入用户信息和修改用户信息
import { getuserinfo, getuserprofile } from '@/api/user.js'
// 引入上传头像组件
import UploadPhoto from './upload-photo.vue'
export default {
  components: {
    UploadPhoto
  },
  data () {
    return {
      // 用户信息
      user: {},
      // 上传照片
      isshowphoto: false,
      // base64格式图片
      base64p: null
    }
  },
  created () {
    this.getuser()
  },
  methods: {
    // 加载用户信息
    async getuser () {
      try {
        const data = await getuserinfo()
        // console.log(data)
        this.user = data
      } catch (error) {
        this.$toast.fail('获取用户信息失败')
      }
    },
    // 修改信息
    async handleSave () {
      const data = await getuserprofile({
        // 此处模拟修改名字
        name: '1a1a1a'
      })
      console.log(data)
    },
    // 点击头像
    selfphoto () {
      this.isshowphoto = true
    },
    // 接收修改后的头像
    handlephoto (photo) {
      this.user.photo = photo
    },
    // 加收传过来的base64格式的图片
    base64photo (base64) {
    //   this.base64p = base64
    // 经测验此接口存在问题，所以此处使用上面的普通格式图片即可
    }
  }
}
</script>

<style lang="less" scoped>
</style>
