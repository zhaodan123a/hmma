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

// 获取文章详情
export const getarticlesdetail = (article_id) => {
  return request({
    method: 'get',
    url: `/app/v1_0/articles/${article_id}`
  })
}
// 关注
export const havefollow = (userId) => {
  return request({
    method: 'post',
    url: `/app/v1_0/user/followings`,
    data: { target: userId }
  })
}
// 取消关注
export const unfollow = (userId) => {
  return request({
    method: 'delete',
    url: `/app/v1_0/user/followings/${userId}`
  })
}
// 获取评论或评论回复

// type	是	a或c	评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
// source	是		源id，文章id或评论id
// offset	否		获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
// limit	否		获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量

export const getreply = ({
  istype = true,
  source,
  offset = null, // 将会从开头读取
  limit = 10
}) => {
  return request({
    method: 'get',
    url: `/app/v1_0/comments`,
    params: {
      type: istype ? 'a' : 'c',
      source,
      offset,
      limit
    }
  })
}
// 添加评论或评论回复

// target	integer	必须		评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
// content	string	必须		评论内容
// art_id	integer	非必须		文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
export const addcomm = ({
  target,
  articleId = null,
  content
}) => {
  return request({
    method: 'post',
    url: `/app/v1_0/comments`,
    data: {
      target,
      content,
      art_id: articleId
    }
  })
}
