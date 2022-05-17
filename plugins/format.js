import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // import locale
dayjs.locale('zh-cn') // use locale

export function dateFormatFilter(date, fmt) {
  if (!date) return '-'
  return dayjs(date).format(fmt)
}
const filters = {
  dateFormatFilter,
}

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

export default filters
