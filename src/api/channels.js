import request from '@/utils/request.js'

// 获取频道列表（分用户是否登录）
export const getchannels = () => {
  return request({
    method: 'get',
    url: 'app/v1_0/user/channels',
    data: {}
  })
}
// 获取全部频道列表
export const getallchannels = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/channels',
    data: {}
  })
}
// 添加频道（设置频道列表---增量式）

export const addnewchannels = (channels) => {
  return request({
    method: 'put',
    url: '/app/v1_0/user/channels',
    data: { channels }
  })
}
// 删除频道(删除用户指定频道)
export const delachannels = (id) => {
  return request({
    method: 'delete',
    url: `/app/v1_0/user/channels/${id}`,
    data: { }
  })
}
