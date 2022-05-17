import qs from 'qs'

export default function (ctx) {
  const { $axios, store, app } = ctx
  $axios.defaults.timeout = 10000
  $axios.transformRequest = [
    (data, header) => {
      if (header['Content-Type'] && header['Content-Type'].includes('json')) {
        return JSON.stringify(data)
      }
      return qs.stringify(data, { arrayFormat: 'repeat' })
    }
  ]

  $axios.onRequest((config) => {
    const token = store.getters.token
    token && (config.headers.token = token);
    if (config.method === 'get') {
      config.paramsSerializer = function (params) {
        return qs.stringify(params, { arrayFormat: 'repeat' }) // params是数组类型如arr=[1,2]，则转换成arr=1&arr=2
      }
    }
    return config
  })

  $axios.onRequestError((error) => {
    console.log('onRequestError', error)
  })

  $axios.onResponse((res) => {
    const { code, success } = res.data
    if (success && code === 200) {
      if (res.headers['content-type'] === 'text/html') {
        return res
      } else {
        return res.data
      }
    } else {
      return Promise.reject(res.data)
    }
  })

  // $axios.onResponseError((error) => {
  //   console.log('onResponseError', error)
  // })

  $axios.onError((error) => {
    const { code, message, success } = error.response.data
    if (!success && code === 401) {
      app.$toast.error('请先登录才能进行此操作哟！')
      sessionStorage.clear()
      store.dispatch('changeUserInfo', null)
      store.dispatch('changeToken', '')
      store.dispatch('toggleSignInModal', true)
      return
    }
    if (message) {
      app.$toast.error(message)
    } else {
      app.$toast.error('服务器出现点小问题,刷新试试吧')
    }
  })
}
