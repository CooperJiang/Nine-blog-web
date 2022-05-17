<template>
  <div class="z-toast">
    <transition :name="mergedOption.transition">
      <div v-show="showing" :id="mergedOption.id" :class="clazz" class="z-toast z-toast-wrapper">
        <Icon v-if="option.icon" :size="20" :icon="option.icon" style="margin-right: 10px;"></Icon>
        <span class="z-toast-content" v-html="mergedOption.message"></span>
        <a v-if="mergedOption.closeable" class="z-toast-close" @click="close">&times;</a>
      </div>
    </transition>
  </div>
</template>

<script>
import Icon from '@/components/base/Icon'

const DEFAULT_OPT = {
  id: 'my-toast',
  horizontalPosition: 'center',
  verticalPosition: 'top',
  parent: 'body',
  transition: 'slide-down',
  duration: 3000,
  size: '',
  type: 'info',
  icon: '',
  message: '',
  closeable: false
}

export default {
  DEFAULT_OPT,
  name: 'Toast',
  components: {
    Icon
  },
  data() {
    return {
      showing: false,
      queue: [],
      option: {}
    }
  },
  computed: {
    mergedOption() {
      return Object.assign({}, DEFAULT_OPT, this.option)
    },
    clazz() {
      const { type, size, horizontalPosition, verticalPosition } = this.mergedOption
      return [
        `z-toast-${type}`,
        {
          [`z-toast-${size}`]: size,
          [`z-toast-${horizontalPosition}`]: horizontalPosition,
          [`z-toast-${verticalPosition}`]: verticalPosition
        }
      ]
    }
  },
  watch: {
    queue() {
      const pending = this.queue.length
      if (pending === 0) {
        return
      }
      this.showing = true
      this.option = this.queue[0]
      if ((!this.option.mode || this.option.mode === 'override') && pending > 1) {
        clearTimeout(this.timeoutId)
        this.showing = false
        this.timeoutId = null
        this.timeoutId = setTimeout(() => this.queue.shift())
      } else {
        this.timeoutId = setTimeout(() => {
          this.showing = false
          this.timeoutId = null
          setTimeout(() => this.queue.shift())
        }, this.mergedOption.duration)
      }
    }
  },
  methods: {
    close() {
      this.showing = false
      this.queue.shift()
    }
  }
}
</script>

<style lang="less" scoped>
.z-toast {
  &-wrapper {
    position: fixed;
    top: 80px;
    display: flex;
    align-items: center;
    z-index: 9999;
    margin: auto;
    font-size: 14px;
    border-radius: 4px;
    padding: 5px 40px 5px 10px;
    background-color: mix(@colorTextWhite, @colorTextContent, 90%);
    border: 1px solid mix(@colorTextWhite, @colorTextContent, 80%);
    color: @colorTextContent;
  }
  .z-toast-content {
    min-width: 150px;
    width: auto;
  }
  & .z-toast-close {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    cursor: pointer;
    color: #c0c4cc;
    font-size: 16px;
    height: 24px;
    line-height: 22px;
    font-weight: bold;
  }
  // position
  .z-toast-top {
    top: 80px;
    bottom: auto;
  }
  .z-toast-middle {
    top: 50%;
  }
  .z-toast-bottom {
    top: auto;
    bottom: 0;
  }
  .z-toast-right {
    right: 0;
    left: auto;
  }
  .z-toast-left {
    right: auto;
    left: 0;
  }
  .z-toast-center {
    left: 50%;
    transform: translateX(-50%);
  }

  // theme
  .z-toast-primary {
    background-color: mix(@colorTextWhite, @colorPrimary, 90%);
    border: 1px solid mix(@colorTextWhite, @colorPrimary, 80%);
    color: @colorPrimary;
  }
  .z-toast-info {
    background-color: mix(@colorTextWhite, @colorInfo, 90%);
    border: 1px solid mix(@colorTextWhite, @colorInfo, 80%);
    color: @colorInfo;
  }
  .z-toast-success {
    background-color: mix(@colorTextWhite, @colorSuccess, 90%);
    border: 1px solid mix(@colorTextWhite, @colorSuccess, 80%);
    color: @colorSuccess;
  }
  .z-toast-warning {
    background-color: mix(@colorTextWhite, @colorWarning, 90%);
    border: 1px solid mix(@colorTextWhite, @colorWarning, 80%);
    color: @colorWarning;
  }
  .z-toast-error {
    background-color: mix(@colorTextWhite, @colorError, 90%);
    border: 1px solid mix(@colorTextWhite, @colorError, 80%);
    color: @colorError;
  }

  // size
  .z-toast-small {
    padding: 2px 5px;
    font-size: 12px;
  }
  .z-toast-large {
    padding: 10px 15px;
    font-size: 16px;
  }

  // animate
  .fade-enter-active,
  .fade-leave-active,
  .fade-transition {
    -webkit-transition: opacity 0.3s ease;
    transition: opacity 0.3s ease;
  }

  .fade-enter,
  .fade-leave,
  .fade-leave-active {
    opacity: 0;
  }

  .slide-down-enter-active,
  .slide-down-leave-active,
  .slide-down-transition {
    -webkit-transition: opacity 0.3s ease, top 0.3s ease;
    transition: opacity 0.3s ease, top 0.3s ease;
  }

  .slide-down-leave-active,
  .slide-down-enter,
  .slide-down-leave {
    opacity: 0;
    top: -10% !important;
  }

  .slide-up-enter-active,
  .slide-up-leave-active,
  .slide-up-transition {
    -webkit-transition: opacity 0.3s ease, top 0.3s ease-in;
    transition: opacity 0.3s ease, top 0.3s ease-in;
  }

  .slide-up-leave-active,
  .slide-up-enter,
  .slide-up-leave {
    opacity: 0;
    top: 110% !important;
  }

  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-left-transition {
    -webkit-transition: opacity 0.3s ease, left 0.3s ease-in;
    transition: opacity 0.3s ease, left 0.3s ease-in;
  }

  .slide-left-leave-active,
  .slide-left-enter,
  .slide-left-leave {
    opacity: 0;
    left: 110% !important;
  }

  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-right-transition {
    -webkit-transition: opacity 0.3s ease, left 0.3s ease;
    transition: opacity 0.3s ease, left 0.3s ease;
  }

  .slide-right-leave-active,
  .slide-right-enter,
  .slide-right-leave {
    opacity: 0;
    left: -1000px !important;
  }
}
</style>
