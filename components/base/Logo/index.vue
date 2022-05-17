<template>
  <div :style="styles" class="logo" @click="handleClick">
    <img :src="imgUrl" alt="Mingme" />
  </div>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    w: {
      type: [Number, String],
      default: 'auto'
    },
    h: {
      type: [Number, String],
      default: 'auto'
    },
    theme: {
      type: String,
      default: 'black'
    }
  },
  computed: {
    styles() {
      return {
        width: typeof this.w === 'number' ? `${this.w}px` : this.w,
        height: typeof this.h === 'number' ? `${this.h}px` : this.h
      }
    },
    imgUrl() {
      if (this.theme === 'white') {
        return require('~/assets/images/logo.png')
      }
      return require('~/assets/images/logo.png')
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
.logo {
  z-index: 310;
  overflow: hidden;
  display: flex;
  margin: 0 auto;
  align-items: center;
  img {
    flex: none;
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
