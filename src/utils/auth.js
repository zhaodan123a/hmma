// 存储token
const NOW_TOKEN = 'hmma'
export const settoken = (data) => window.localStorage.setItem(NOW_TOKEN, JSON.stringify(data))
export const gettoken = () => JSON.parse(window.localStorage.getItem(NOW_TOKEN))
export const removetoken = () => window.localStorage.removeItem(NOW_TOKEN)
