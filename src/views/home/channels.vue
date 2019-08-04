<template>
  <div>
    <!-- 点击右上角，弹出的频道选择组件 -->
    <van-popup :value="value" @input="$emit('input',$event)" position="bottom" :style="{ height: '94%' }">
      <!-- 我的频道 -->
      <div class="channel">
        <div class="channel-head">
          <div>
            <span class="title">我的频道</span>
            <span class="desc">点击进入频道</span>
          </div>
          <div>
            <van-button type="danger" plain size="mini" @click="isEdit=!isEdit">{{!isEdit?'编辑':'完成'}}</van-button>
          </div>
        </div>
        <van-grid class="channel-content" :gutter="10" clickable>
            <!-- inchannels事件，点击后会关闭弹出层进入该频道 -->
          <van-grid-item v-for="(item,index) in channelList" :key="item.id" @click='inchannels(item,index)' text="文字">
            <!-- 判断是激活的频道时再把样式改变（加类名） -->
            <span class="text" :class="{active:index===hoverChannel && !isEdit}">{{item.name}}</span>
            <!-- 当进入编辑状态且第一个不显示x小图标 -->
            <!-- 默认推荐的频道不能删除（即：最少留一个） -->
            <!-- !firstchannel.includes("item.name")表示将频道中名字是推荐的排除 -->
            <van-icon class="close-icon" name="close" v-if='isEdit &&!firstchannel.includes("item.name")' />
          </van-grid-item>
        </van-grid>
        <div class="channel-content"></div>
      </div>
      <!-- 频道推荐 -->
      <div class="channel">
        <div class="channel-head">
          <div>
            <span class="title">频道推荐</span>
            <span class="desc">点击添加频道</span>
          </div>
        </div>
        <van-grid class="channel-content" :gutter="10" clickable>
            <!-- handleadd(item)表示点击事件 -->
          <van-grid-item v-for="(item,index) in bottomchannels" :key="item.id" @click="handleadd(item,index)" text="文字">
            <div class="info">
              <span class="text">{{item.name}}</span>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </van-popup>
  </div>
</template>

<script>
// 引入获取全部频道列表请求，引入添加频道请求,引入删除频道请求
import { getallchannels, addnewchannels, delachannels } from '@/api/channels.js'
import { mapState } from 'vuex'
export default {
  name: 'ChannelIndex',
  props: {
    //   接收开启或关闭弹窗的数据
    value: {
      type: Boolean,
      default: false
    },
    // 接收我的频道列表
    channelList: {
      type: Array,
      // 简写，因为default只能写简单数据类型，所以数组要通过函数返回得到
      //   default:()=>{return []}
      default: () => []
    },
    // 接收激活频道的下标
    hoverChannel: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      // 接收的全部频道数组
      allchannels: [],
      // 控制编辑还是完成的变量,为true(编辑)时进入频道
      isEdit: false,
      // 将推荐频道拿出来
      firstchannel: ['推荐']
    }
  },
  computed: {
    ...mapState(['user']),
    // 频道推荐数组，在全部频道基础上减去我的频道数组。
    bottomchannels () {
      // 获取我的频道中的id
    //   map是将数组遍历，并将里面的id放到新数组中返回
      const ids = this.channelList.map(item => {
        return item.id
      })
      // 过滤出我的频道中的id，返回剩下的id
      // 返回最终数组
      return this.allchannels.filter(item => {
        return !ids.includes(item.id)
      })
    }
  },
  created () {
    this.everychannels()
  },
  methods: {
    // 获取全部频道
    async everychannels () {
      const data = await getallchannels()
      //   console.log(data)
      // 在返回的频道数组中添加下面这些项
      data.channels.forEach(item => {
        item.articles = [], // 存放当前频道的文章列表
        item.downpullLoading = false, // 下拉刷新的动画
        item.uppullLoading = false, // 上拉刷新的状态
        item.upFinished = false, // 加载完毕的动画
        item.successText = '', // 下拉刷新的提示文本
        item.timestamp = Date.now() // 时间戳
      })
      this.allchannels = data.channels
    },
    // 点击将频道推荐中的频道加到我的频道中
    async handleadd (item) {
      this.channelList.push(item)
      // 分为用户登录和没登录两种情况
      if (this.user) {
        // 登录了就发送请求
        // 使用slice是因为接口问题：推荐频道不在我的频道中，所以需要将推荐去掉
        // 遍历数组，得到id和seq
        const data = this.channelList.slice(1).map((item, index) => {
          return {
            id: item.id,
            // 顺序序号（保证在添加时不会打乱顺序），是从2开始的
            seq: index + 2
          }
        })
        await addnewchannels(data)
      } else {
        // 没登录则般存在本地
        window.localStorage.setItem('channels', JSON.stringify(this.channelList))
      }
    },
    // 我的频道点击事件
    async inchannels (item, index) {
      if (!this.isEdit) {
        // 进入频道，即：点击频道时，会进入该频道（使用函数）
        // console.log('进入')
        this.comchannels(item, index)
      } else {
        // 删除该频道,推荐频道不能删除
        !this.firstchannel.includes(item.name) && this.delchannels(item, index)
      }
    },
    // 进入频道
    comchannels (a, b) {
      // 向父组件传值，修改激活的频道id
      this.$emit('update:active-index', b)
      // 向父组件传值，关闭弹出层
      this.$emit('input', false)
    },
    // 删除频道,传入值和下标
    async delchannels (a, b) {
      // console.log('删除成功！')
      this.channelList.splice(b, 1)
      // 解决删除激活频道会自动激活下一个频道，但首页内容不显示的问题
      // 将消息通知父组件
      this.$emit('success-del')
      // 要分是否登录
      if (this.user) {
        // 已登录，发请求
        try {
          await delachannels(a.id)
        } catch (error) {
          console.dir(error)
        }
        return false
      } else {
        // 未登录，从本地删除
        // 因为locationStorage没有删除的指令，所以采用重新赋值的方法
        window.localStorage.setItem('channels', JSON.stringify(this.channelList))
      }
    }
  }
}
</script>

<style lang="less" scoped>
.channel {
  .channel-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .title {
      font-size: 30px;
      margin-right: 5px;
    }
    .desc {
      font-size: 12px;
    }
    .action {
    }
  }
  .channel-content {
    .text {
      font-size: 16px;
    }
    .active {
      color: red;
    }
    .close-icon {
      font-size: 20px;
      position: absolute;
      top: -5px;
      right: -5px;
      z-index: 999;
      background-color: #fff;
    }
    .info {
      display: flex;
      align-items: center;
    }
  }
}
</style>
