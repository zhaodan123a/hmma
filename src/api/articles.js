import request from '@/utils/request.js'

// 获取频道新闻列表
export const getarticles = ({
  channelId: channel_id,
  timestamp,
  withTop: with_top
}) => {
  return request({
    method: 'get',
    url: '/app/v1_1/articles',
    params: {
      channel_id, // 频道id
      timestamp, // 时间戳
      with_top // 是否置顶
    }
  })
}
