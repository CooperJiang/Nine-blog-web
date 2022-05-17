<template>
  <transition name="fade" mode="out-in">
    <!-- <div class="mask"> -->
      <div
        v-if="options && options.show"
        :style="{
          width: `${options.width}px`,
          height: `${options.height}px`,
          top: `${options.top}px`,
          right: `${options.right}px`,
          left: `${options.left}px`,
          bottom: `${options.bottom}px`
        }"
        class="frame"
        @click.stop
      >
        <div class="frame-title title">{{ options.title || 标题文字 }} <span class="title-r"><slot name="header"></slot></span></div>
        <div class="frame-content"><slot></slot></div>
      </div>
    <!-- </div> -->
  </transition>
</template>

<script>
export default {
  name: 'ChatFrame',
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      visible: false
    }
  },
  mounted() {
    document.addEventListener('click', this.bodyClose)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.bodyClose)
  },
  methods: {
    bodyClose() {
      const self = this
      if (self.options.show === true) {
        self.options.show = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
.mask{
  position: fixed;
  width: 100vw !important;
  height: 100vh !important;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  border-radius: 0;
  z-index: 98;
}
.frame {
  transition: all 0.3s;
  position: absolute;
  width: 350px;
  height: 500px;
  box-shadow: 0 0 10px rgba(89, 36, 36, 0.2);
  background-color: rgba(255, 255, 255, 0.8);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  z-index: 99;
  .title {
    color: #000;
    font-size: 16px;
    font-weight: 600;
    /* stylelint-disable */
    font-family: 'webfont';
  }
  .title-r{
    color: #999;
    font-size: 14px;
  }
  &-title {
    font-size: 16px;
    padding: 10px 15px;
    padding-right: 10px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
  &-content {
    flex: 1;
    height: 0;
    // overflow: hidden;
    // overflow-y: auto;
  }
}

@media screen and (max-width: 480px) {
  .frame {
    right: 10px !important;
    left: 10px !important;
    width: auto !important;
  }
}

.fade-enter,
.fade-leave-to {
  // opacity: 0;
  width: 30px;
  // height: 0;
  transform: translateX(150px);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
</style>
