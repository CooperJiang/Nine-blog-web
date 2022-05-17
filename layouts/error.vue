<template>
<div class="s-container">
  <div class="error">
    <nuxt-link to="/"><rotating-text :words="errorTips" /></nuxt-link>
    <nuxt-link to="/"><rotating-text :words="errorTips2" /></nuxt-link>
  </div>
</div>

</template>

<script>
import RotatingText from '@/components/kit/RotatingText'
export default {
  components: {RotatingText},
  props: {
    error:{
      type: String,
      default: ""
    }
  },
  data(){
    return {
      errorTips: [
        {
          label: '系统出现点小问题',
          color: '#2db7f5'
        },
        {
          label: '系统出现点小问题',
          color: '#38B9CC'
        },
        {
          label: '系统出现点小问题',
          color: '#49BC8D'
        },
        {
          label: '系统出现点小问题',
          color: '#6bc30d'
        }
      ],
      errorTips2: [
        {
          label: '请检查网络或者刷新页面',
          color: '#49BC8D'
        },
        {
          label: '请检查网络或者刷新页面',
          color: '#6bc30d'
        },
        {
          label: '请检查网络或者刷新页面',
          color: '#2db7f5'
        },
        {
          label: '请检查网络或者刷新页面',
          color: '#38B9CC'
        }
      ],
    }
  }
}
</script>
<style lang="less">
.error{
  font-size: 20px;
  min-height: calc(100vh - 330px);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>
