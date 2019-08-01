import axios from 'axios'
import store from '../store'
// 引入bigint处理文章id过大问题
import JSONBig from 'json-bigint'
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
}, (error) => {
  return Promise.reject(error)
})
export default request
