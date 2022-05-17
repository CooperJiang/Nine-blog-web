<template>
  <svg-icon :w="size" :h="size" :name="icon" />
</template>

<script>
import svgIcon from 'vue2-svg-icon/Icon.vue'
export default {
  name: 'Icon',
  components: { svgIcon },
  props: {
    size: {
      type: Number,
      default: () => 20
    },
    icon: {
      type: String,
      require: false,
      default: () => 'like'
    },
    // color: {
    //   type: String,
    //   default: () => '#cdcdcd'
    // }
  }
}
</script>
