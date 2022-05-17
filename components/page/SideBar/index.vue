<template>
  <div class="side-bar">
    <type-list />
  </div>
</template>

<script>
import TypeList from '@/components/page/TypeList'
export default {
  components: {
    TypeList
  }
}
</script>
<style lang="less" scoped>
.side-bar {
  width: 100;
}
</style>
