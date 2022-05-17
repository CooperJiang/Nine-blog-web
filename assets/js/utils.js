/**
 * @desc 格式化聊天时间记录
 * @param {*} timeSpace
 */
export const formatChatTime = date => {
  date = new Date(date).getTime()
  const autoZero = (n) => (String(n).length === 1 ? '0' : '') + n
  const oriSecond = date / 1000
  const curSecond = parseInt(new Date().getTime() / 1000)
  const diffSecond = curSecond - oriSecond
  const curDate = new Date(curSecond * 1000)
  const oriDate = new Date(oriSecond * 1000)
  const Y = oriDate.getFullYear()
  const m = oriDate.getMonth() + 1
  const d = oriDate.getDate()
  const H = oriDate.getHours()
  const i = oriDate.getMinutes()
  // just
  if (diffSecond < 60) {
    // within a minute
    return '刚刚'
  } else if (diffSecond < 3600) {
    // within an hour
    return `${Math.floor(diffSecond / 60)}分钟前`
  } else if (
    curDate.getFullYear() === Y &&
  curDate.getMonth() + 1 === m &&
  curDate.getDate() === d
  ) {
    return `今天${autoZero(H)}:${autoZero(i)}`
  }
  // yesterday
  const mewDate = new Date((curSecond - 86400) * 1000)
  if (mewDate.getFullYear() === Y && mewDate.getMonth() + 1 === m && mewDate.getDate() === d) {
    return `昨天${autoZero(H)}:${autoZero(i)}`
  } else if (curDate.getFullYear() === Y) {
    return `${autoZero(m)}月${autoZero(d)}日`
  }
  return `${Y}年${autoZero(m)}月${autoZero(d)}日`
}
