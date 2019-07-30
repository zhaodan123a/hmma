import Vue from 'vue'
import Vuex from 'vuex'
// 引入token的方法,将里面的方法都加上auth前缀(因为token需要在多个组件中传递，在vuex中使用token)
import * as auth from '@/utils/auth.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 获取token方法
    user: auth.gettoken()
  },
  mutations: {
    settoken (state, data) {
      // 获取新的token值
      state.user = data
      // 重新设置token
      auth.settoken(state.user)
    }
  },
  actions: {

  }
})
