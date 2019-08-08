<template>
  <div class="chart">
    <!-- 聊天 -->
    <van-nav-bar fixed title="聊天" left-text="返回" left-arrow @click-left="$router.back()"></van-nav-bar>

    <div class="chat-window" ref="chat-window">
      <van-cell
        :class="item.from!=='myself'?'left':'right'"
        v-for="(item,index) in msgs"
        :key="index"
        :value="item.msg"
      />
      <div class="clear"></div>
    </div>

    <van-cell-group border class="sendmsg">
      <van-field border v-model="msg" center>
        <van-button slot="button" size="small" type="primary" @click="sendAmsg">发送</van-button>
      </van-field>
    </van-cell-group>
  </div>
</template>

<script>
// 引入socket.io-client
import io from 'socket.io-client'

export default {
  data () {
    return {
      msg: '你好，小智机器人',
      msgs: [],
      // 确定是否建立连接的标志
      iscomment: false,
      socket: null
    }
  },
  created () {
    if (this.$store.state.user) {
      this.getcharts()
    }
  },
  methods: {
    // 聊天连接
    getcharts () {
      // 建立连接
      this.socket = io('http://ttapi.research.itcast.cn', {
        query: { token: this.$store.state.user.token }
      })
      this.socket.on('connect', () => {
        console.log('连接成功')
        // 连接成功的标志
        this.iscomment = true
        // 发布消息
        this.sendMsg()
      })
    },
    // 发布消息
    sendMsg () {
      this.socket.emit('message', {
        msg: this.msg,
        timestamp: Date.now()
      })
      // 更新视图
      this.msgs.push({
        msg: this.msg,
        from: 'myself'
      })
      // 清空列表，否则将会出现好几次相同的回答
      this.msg = ''
      // 接收消息
      this.resMsg()
    },
    // 接收消息
    resMsg () {
      this.socket.on('message', data => {
        // 更新视图
        this.msgs.push({
          msg: data.msg,
          from: 'yourself' // 为了区分是发送方还是接收方
        })
      })
    },
    // 发送事件
    sendAmsg () {
      this.getcharts()
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: #1989fa;
  .van-nav-bar__title {
    color: #ffffff;
  }
  .van-nav-bar__text{
      color:#fff;
  }
  .van-icon{
    color:#fff;
  }
}

.sendmsg {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
.sendmsg /deep/ .van-cell {
  border: 1px solid black;
}

.chat .chat-window {
  position: relative;
  top: 92px;
  font-size: 14px;
}
.chat /deep/ .van-nav-bar__text {
  color: #ffffff;
}
.clear {
  height: 102px;
}
.chat-window /deep/ .left .van-cell__value {
  color: red;
}
.chat-window /deep/ .right .van-cell__value {
  color: green;
}
</style>
