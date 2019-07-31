import request from '@/utils/request.js'

// 获取频道分类（分用户是否登录）
export const getchannels = () => {
  return request({
    method: 'get',
    url: 'app/v1_0/user/channels',
    data: {}
  })
}
