import request from '@/utils/request.js'

// 搜索时自动显示内容（自动获取联想建议---关键字自动补全）
// q	是		请求的前缀词句
export const getsearch = (q) => {
  return request({
    method: 'get',
    url: '/app/v1_0/suggestion',
    params: { q }
  })
}

// 获取搜索结果
export const getsearchResults = ({ page, per_page, q }) => {
  return request({
    methods: 'get',
    url: '/app/v1_0/search',
    params: { page, per_page, q }
  })
}
