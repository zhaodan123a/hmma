import request from '@/utils/request.js'

// 封装并导出登录请求
export const login = ({ mobile, code }) => {
  return request({
    method: 'post',
    url: 'app/v1_0/authorizations',
    data: { mobile, code }
  })
}
