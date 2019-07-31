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
// 引入图片懒加载，只加载下一屏的图片
import VueLazyload from 'vue-lazyload'
// 引入时间处理插件（和momentjs基本相同，但dayjs体积更小）
import dayjs from 'dayjs'
// 引入相对时间处理（要显示几秒前）
import relativeTime from 'dayjs/plugin/relativeTime'
// 汉化时间
import 'dayjs/locale/zh-cn'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
Vue.use(VueLazyload)
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
// 睡眠状态（防止加载中过快体验不好）,因为定时器是异步的，所以使用过promise处理
Vue.prototype.$sleep = newtime => {
  return new Promise((reslove, reject) => {
    window.setTimeout(() => {
      reslove()
    }, newtime)
  })
}

// 过滤器设置时间为相对时间,在home中使用
Vue.filter('reltime', (value) => {
  return dayjs()
    .locale('zh-cn')
    .from(value)
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
