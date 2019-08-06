import axios from 'axios'
import store from '../store'
// 引入bigint处理文章id过大问题
import JSONBig from 'json-bigint'
// 引入rouer，跳转
import router from '../router.js'
// 创建axios对象
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 处理文章id
request.defaults.transformResponse = [function (data) {
  try {
    return JSONBig.parse(data)
  } catch (error) {
    return data
  }
}]

// 请求拦截器
request.interceptors.request.use(function (config) {
  // console.log(config)
  // 如果已经登录则config中的url是/app/v1_0/authorizations
  // 设置请求头
  if (config.url !== 'app/v1_0/authorizations') {
    const { user } = store.state
    user && (config.headers.Authorization = `Bearer ${user.token}`)
    // console.log(config)
  }

  return config
}, (error) => {
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function (response) {
  // 如果存在data则返回，如果没有则照样返回数据
  return response.data.data || response.data
}, async (error) => {
  const { user } = store.state
  // 处理token过期问题(使用refresh-token刷新token)
  if (error.response.status === 401) {
  // 判断用户是否登录
    if (user) {
      // 登录，刷新token
      try {
        const res = await axios({
          method: 'put',
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${user.refresh_token}`
          }
        })
        console.log(res)
        // 重新赋值token
        store.commit('settoken', { token: res.data.data.token, refresh_token: user.refresh_token })
        // 如果不是刷新token，继续进入请求拦截器
        return request(error.config)
      } catch (shi) {
        // 刷新token失败，跳到登录页
        router.push({ name: 'login' })
      }
    } else {
      // 没登录，跳转到登录页
      router.push({ name: 'login' })
    }
  }

  return Promise.reject(error)
})
export default request
