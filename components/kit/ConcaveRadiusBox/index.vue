<template>
  <div class="concave-radius-box">
    <div :class="['concave-radius top-left position-right', `concave-radius-${theme}`]" :style="styles"></div>
    <div :class="['concave-radius top-right position-left', `concave-radius-${theme}`]" :style="styles"></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CancaveRadiusBox',
  props: {
    size: {
      type: [String, Number],
      default: '100px'
    },
    theme: {
      type: String,
      default: 'white'
    }
  },
  computed: {
    styles() {
      return {
        height: typeof this.size === 'number' ? `${this.size}px` : this.size,
        width: typeof this.size === 'number' ? `${this.size}px` : this.size
      }
    }
  }
}
</script>

<style lang="less" scoped>
.concave-radius {
  position: absolute;
  top: 0;
  overflow: hidden;
  &-box {
    position: relative;
    padding: 0 5px 5px;
  }
  &::before {
    content: '';
    width: 200%;
    height: 200%;
    position: absolute;
    // background: radial-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 69%, rgba(0, 0, 0, 0.1), 70.6%, #fff 70.7%, #fff 100%);
    // background: radial-gradient(transparent 0%, transparent 69%, rgba(0, 0, 0, 0.1), 70.6%, rgba(0, 0, 0, 0.8) 70.7%, rgba(0, 0, 0, 0.8) 100%);
  }
  &.top-left::before {
    top: 0;
    left: 0;
  }
  &.top-right::before {
    top: 0;
    right: 0;
  }
  &.bottom-left::before {
    bottom: 0;
    left: 0;
  }
  &.bottom-right::before {
    top: 0;
    right: 0;
  }
  &.position-right {
    left: 100%;
  }
  &.position-left {
    right: 100%;
  }
}
.concave-radius-white {
  &::before {
    background: radial-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 69%, rgba(0, 0, 0, 0.1), 70.6%, rgba(255, 255, 255, 0.9) 70.7%, rgba(255, 255, 255, 0.9) 90%);
  }
}
.concave-radius-black {
  &::before {
    background: radial-gradient(transparent 0%, transparent 69%, rgba(0, 0, 0, 0.1), 70.6%, rgba(0, 0, 0, 0.8) 70.7%, rgba(0, 0, 0, 0.8) 100%);
  }
}
</style>
