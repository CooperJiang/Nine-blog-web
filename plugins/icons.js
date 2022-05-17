import Vue from 'vue'
import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'

Vue.component('SvgIcon', SvgIcon)

const requireAll = (requireContext) => requireContext.keys().map(requireContext)
const req = require.context('@/assets/icons/svg', false, /\.svg$/)
requireAll(req)
