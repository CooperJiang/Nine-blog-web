<template>
    <div class="lrc">
      <Icon icon="chat-headset" :size="14" class="icon" />{{ currentLrc || '歌词加载中...' }}
    </div>
</template>

<script>
import Icon from '@/components/base/Icon'
export default {
  components: {Icon},
  props:{
    currentLrc: {
      type: String,
      default: () => null
    }
  },
}
</script>
<style lang='less' scoped>
.lrc{
  color: #686868;
  font-size: 12px;
  padding: 6px 15px;
  display: flex;
  align-items: center;
  letter-spacing: 3px;
}
.icon{
  margin-right: 5px;
}
</style>
