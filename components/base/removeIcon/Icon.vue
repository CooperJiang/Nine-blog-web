<template>
  <i :class="`z-icon iconfont ${type}`" :style="styles" @click="handleClick"></i>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    type: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'inherit'
    },
    size: {
      type: [Number, String],
      default: 'inherit'
    }
  },
  computed: {
    styles() {
      return {
        fontSize: typeof this.size === 'number' ? `${this.size}px` : this.size,
        color: this.color
      }
    }
  },
  methods: {
    handleClick(event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang="less" scoped>
.z-icon {
  display: inline-block;
  vertical-align: middle;
  line-height: 1;
}
</style>
