import request from '@/utils/request.js'

// 封装并导出登录请求
export const login = ({ mobile, code }) => {
  return request({
    method: 'post',
    url: 'app/v1_0/authorizations',
    data: { mobile, code }
  })
}
// 获取当前用户信息
export const getuserinfo = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/user'
  })
}
// 编辑页基本信息
/*
name	string	非必须		昵称
photo	string	非必须		头像 base64编码处理
gender	integer	非必须		性别，0-男，1-女
birthday	string	非必须		生日，格式'2018-12-20'
real_name	string	非必须		真实姓名
id_number	string	非必须		身份证号
id_card_front	string	非必须		身份证正面照片 base64编码处理
id_card_back	string	非必须		身份证背面照片 base64编码处理
id_card_handheld	string	非必须		手持身份证照片 base64编码处理
intro	string	非必须		个人介绍
*/
export const getuserprofile = ({
  name,
  photo,
  gender,
  birthday,
  real_name,
  id_number,
  id_card_front,
  id_card_back,
  id_card_handheld,
  intro
}) => {
  return request({
    method: 'patch',
    url: '/app/v1_0/user/profile',
    data: {
      name,
      photo,
      gender,
      birthday,
      real_name,
      id_number,
      id_card_front,
      id_card_back,
      id_card_handheld,
      intro
    }
  })
}

// 编辑用户的照片资料
// name是名，file是值
export const edituserphoto = (name, file) => {
  // 因为content-type类型是formdata类型，所以需要使用formdata方式提交
  const formData = new FormData()
  // 添加一些数据
  formData.append(name, file)
  return request({
    method: 'patch',
    url: '/app/v1_0/user/photo',
    data: formData
  })
}
