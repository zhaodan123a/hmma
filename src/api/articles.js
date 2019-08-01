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

// 不感兴趣的请求（对文章不喜欢）,传文章id
export const unLikeArticles = (articleId) => {
  return request({
    method: 'post',
    url: '/app/v1_0/article/dislikes',
    data: { target: articleId }
  })
}

// 举报文章
export const report = ({ articleId, type, remark = '' }) => {
  return request({
    method: 'post',
    url: '/app/v1_0/article/reports',
    data: { target: articleId, type, remark }
  })
}
