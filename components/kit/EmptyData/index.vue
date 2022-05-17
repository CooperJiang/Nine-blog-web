<template>
  <div class="no-data-wrap">
    <Icon :style="{ color }" :size="size" icon="empty-data" />
  </div>
</template>

<script>
import Icon from '@/components/base/Icon'
export default {
  name: 'NoData',
  components: { Icon },
  props: {
    size: {
      type: [Number, String],
      default: 150
    },
    color: {
      type: String,
      default: '#cdcdcd'
    }
  }
}
</script>

<style lang="less" scoped>
.no-data-wrap {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
