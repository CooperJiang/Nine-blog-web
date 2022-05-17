<template>
  <transition name="modal">
    <div class="modal-mask" @click="$emit('close', 'mask')">
      <div class="modal-wrapper">
        <div :style="modalContainerStyle" class="modal-container" @click.stop="">
          <div class="modal-header">
            <slot name="header"></slot>
          </div>

          <div class="modal-body">
            <slot name="body"></slot>
          </div>

          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>

          <a class="mode-close" href="javascript:;" @click="$emit('close', 'btn')">
            <i class="iconfont iconclose"></i>
          </a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    width: {
      type: [Number, String],
      default: '300px'
    }
  },
  computed: {
    modalContainerStyle() {
      return {
        width: typeof this.width === 'number' ? `${this.width}px` : this.width
      }
    }
  }
}
</script>

<style lang="less" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  position: relative;
  // width: 300px;
  margin: 0 auto;
  padding: 20px 30px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  border-radius: 5px;

  .modal-header h3 {
    margin-top: 0;
    color: @colorTextTitle;
    text-align: center;
  }

  .modal-body {
    margin: 20px 0;
  }

  .mode-close {
    padding: 10px;
    position: absolute;
    top: 0;
    right: 0;
    line-height: 1;

    .iconfont {
      font-size: 24px;
    }
  }
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
