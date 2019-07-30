import axios from 'axios'
// 创建axios对象
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 请求拦截器
request.interceptors.request.use(function (config) {
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
