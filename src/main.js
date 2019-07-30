import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入vant
import Vant from 'vant'
import 'vant/lib/index.css'
// 引入lib-flexible,解决rem适配
import 'amfe-flexible/index.min.js'
// 引入表单校验
import VeeValidate, { Validator } from 'vee-validate'
// 校验汉化
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.config.productionTip = false

Vue.use(Vant)
Vue.use(VeeValidate)

Validator.localize('zh_CN', zh_CN)

// 自定义验证规则

Validator.extend('phone', {
  getMessage: field => field + '不正确',
  validate: value => {
    // 自己写手机号的验证规则 -> 验证形参value是否符合手机号
    return value.length === 11 && /^((13|15|18|17)[0-9]{1})\d{8}$/.test(value)
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
