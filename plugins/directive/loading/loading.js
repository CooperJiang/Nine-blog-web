import Vue from 'vue'
import Loading from './loading.vue'

const Mask = Vue.extend(Loading)

const insertDom = (parent, el) => {
  parent.appendChild(el.mask)
}

const toggleLoading = (el, binding) => {
  if (binding.value) {
    Vue.nextTick(() => {
      el.instance.visible = true
      insertDom(el, el, binding)
    })
  } else {
    el.instance.visible = false
  }
}

export default {
  bind(el, binding) {
    const mask = new Mask({
      el: document.createElement('div'),
      data() {}
    })
    el.instance = mask
    el.mask = mask.$el
    el.maskStype = {}

    const curStype = window.getComputedStyle(el)
    const position = curStype.position
    if (['absolute', 'reactive'].includes(position)) {
      el.style.position = position
    } else {
      el.style.position = 'relative'
    }

    binding.value && toggleLoading(el, binding)
  },
  update(el, binding) {
    if (binding.oldValue !== binding.value) {
      toggleLoading(el, binding)
    }
  },
  unbind(el) {
    el.instance && el.instance.$destroy()
  }
}
