import Vue from 'vue'
import loadingLogic from './loading'

const loading = Vue.directive('loading', loadingLogic)
export default loading
