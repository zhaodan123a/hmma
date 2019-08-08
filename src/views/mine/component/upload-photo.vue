<template>
  <div>
    <!-- 上传图片 -->
    <van-dialog :value="value" @input="$emit('input', $event)" :show-confirm-button="false">
      <van-cell-group>
        <van-cell title="从相册选择" @click="selectphoto" />
        <!-- 上传 -->
        <input ref="inphoto" type="file" style="display: none;" @change="changephoto" />
        <van-cell title="拍照" />
        <van-cell title="取消" @click="$emit('input', false)" />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
// 引入图片预览
import { ImagePreview } from 'vant'
// 引入编辑用户图片请求
import { edituserphoto } from '@/api/user.js'

export default {
  props: {
    // 接收父组件传过来的值
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 上传头像
    selectphoto () {
      // 获取了上传的DOM标签
      console.log(this.$refs['inphoto'])
      // 通过操作DOM来打开资源管理器
      this.$refs['inphoto'].click()
    },
    // 选择图片
    changephoto () {
      // 此事件触发有两种情况：1.选择新的图片2.已经有一张想要换一张
      // 获取图片，并将图片转成base64格式
      const reader = new FileReader() // js的构造函数
      // 转成base64格式
      reader.readAsDataURL(this.$refs['inphoto'].files[0])
      // 选择图片完毕后触发
      reader.onload = () => {
        // 将base64格式的图片传给profile组件
        this.$emit('photobase64', reader.result)
        // 图片预览
        ImagePreview({
          images: [reader.result],
          startPosition: false,
          onClose: () => {
            // do something
            this.currentDialog()
          }
        })
      }
    },
    // 确认框
    currentDialog () {
      this.$dialog
        .confirm({
          message: '是否确认选择该图片?'
        })
        .then(async () => {
          // on confirm
          // console.log('sure------')
          // 已经有图片了 -> 发送请求
          const data = await edituserphoto(
            'photo',
            this.$refs['inphoto'].files[0]
          )
          console.log(data)
          if (data.photo) {
            // 关闭头像选择的对话框
            this.$emit('input', false)
            // data.photo是头像的url地址
            // 找编辑组件中编辑头像的方法，传值
            this.$emit('upload-success', data.photo)
          }
          // console.log(data)
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
