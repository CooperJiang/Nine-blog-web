import MyToast from './Toast.vue'

export default {
  install(Vue, defaultOptions = {}) {
    const CONSTRUCTOR = Vue.extend(MyToast)
    const CACHE = {}
    Object.assign(MyToast.DEFAULT_OPT, defaultOptions)

    function toast(msg, options = {}) {
      options.message = msg
      const toast = CACHE[options.id] || (CACHE[options.id] = new CONSTRUCTOR())
      if (!toast.$el) {
        const vm = toast.$mount()
        document.querySelector(options.parent || 'body').appendChild(vm.$el)
      }
      toast.queue.push(options)
    }
    toast.primary = function(message, otherOptions) {
      return toast(message, {
        type: 'primary',
        ...otherOptions
      })
    }
    toast.info = function(message, otherOptions) {
      return toast(message, {
        type: 'info',
        icon: 'iconinfo',
        ...otherOptions
      })
    }
    toast.success = function(message, otherOptions) {
      return toast(message, {
        type: 'success',
        icon: 'home',
        ...otherOptions
      })
    }
    toast.warning = function(message, otherOptions) {
      return toast(message, {
        type: 'warning',
        icon: 'iconwarning',
        ...otherOptions
      })
    }
    toast.error = function(message, otherOptions) {
      return toast(message, {
        type: 'error',
        icon: 'iconerror',
        ...otherOptions
      })
    }
    Vue.toast = Vue.prototype.$toast = toast
  }
}
