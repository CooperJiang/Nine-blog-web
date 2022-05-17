<template>
  <div :class="classes">
    <div class="z-tag-content">
      <icon v-if="icon" :name="icon"></icon>
      <slot></slot>
    </div>
    <icon
      v-if="closeable"
      name="iconclose"
      @click.native.stop="handleClose"
    ></icon>
  </div>
</template>

<script>
import { oneOf } from '@/assets/js/tools'

const prefixCls = 'z-tag'

export default {
  name: 'Tag',
  components: {},
  props: {
    theme: {
      type: String,
      validator(value) {
        return oneOf(value, [
          'gradient',
          'default',
          'primary',
          'info',
          'success',
          'warning',
          'error'
        ])
      },
      default: 'default'
    },
    icon: {
      type: String,
      default: ''
    },
    shape: {
      type: String,
      validator(value) {
        return oneOf(value, ['rect', 'radius', 'circle'])
      },
      default: 'radius'
    },
    size: {
      type: String,
      validator(value) {
        return oneOf(value, ['small', 'large', 'default'])
      },
      default: 'default'
    },
    type: {
      type: String,
      validator(value) {
        return oneOf(value, ['border', 'dashed', 'default'])
      },
      default: 'default'
    },
    closeable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        `${prefixCls}-${this.theme}`,
        {
          [`${prefixCls}-closeable`]: this.closeable,
          [`${prefixCls}-${this.shape}`]: !!this.shape,
          [`${prefixCls}-${this.type}`]: this.type !== 'default',
          [`${prefixCls}-${this.size}`]: this.size !== 'default'
        }
      ]
    }
  },
  methods: {
    handleClose(event) {
      this.$emit('on-close', event)
    }
  }
}
</script>

<style lang="less" scoped>
.z-tag {
  position: relative;
  display: inline-flex;
  margin: 0.2em 0.4em 0.2em 0;
  font-size: 14px;
  vertical-align: middle;
  overflow: hidden;
  color: @colorTextContent;
  border: 1px solid @colorBorder;
  background-color: @colorBg;
  align-items: stretch;

  &-content {
    padding: 0.08em 0.8em 0.1em;
  }

  &:hover {
    background-color: fade(#fff, 50%);
    border-color: lighten(@colorBorder, 10%);
    &::after {
      content: '';
      width: 0;
      position: absolute;
      top: -1px;
      bottom: -1px;
      left: -1px;
      border-left: 1px solid currentColor;
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
    .iconfont::after {
      opacity: 0.6;
    }
  }

  // closeable
  &-closeable {
    .iconfont {
      position: relative;
      display: flex;
      padding: 0 0.308em;
      align-items: center;
      cursor: pointer;
    }
  }

  &-closeable&-dashed {
    .iconfont {
      &::after {
        border-left-style: dashed;
      }
    }
  }

  // size
  &-small {
    font-size: 12px;
  }
  &-large {
    font-size: 16px;
  }

  // theme
  &-gradient {
    color: @colorPrimary;
    border-color: @colorPrimary;
    background-color: transparent;
    border-image-source: @color;
    border-image-slice: 1;
    @colorActive();
    &:hover {
      background-color: transparent;
      border-color: @colorPrimaryLight;
    }
  }
  &-primary {
    color: #fff;
    border-color: @colorPrimary;
    background-color: @colorPrimary;
    &:hover {
      background-color: @colorPrimaryLight;
      border-color: @colorPrimaryLight;
    }
  }
  &-info {
    color: #fff;
    border-color: @colorInfo;
    background-color: @colorInfo;
    &:hover {
      background-color: @colorInfoLight;
      border-color: @colorInfoLight;
    }
  }
  &-success {
    color: #fff;
    border-color: @colorSuccess;
    background-color: @colorSuccess;
    &:hover {
      background-color: @colorSuccessLight;
      border-color: @colorSuccessLight;
    }
  }
  &-warning {
    color: #fff;
    border-color: @colorWarning;
    background-color: @colorWarning;
    &:hover {
      background-color: @colorWarningLight;
      border-color: @colorWarningLight;
    }
  }
  &-error {
    color: #fff;
    border-color: @colorError;
    background-color: @colorError;
    &:hover {
      background-color: @colorErrorLight;
      border-color: @colorErrorLight;
    }
  }

  // shape
  &-rect {
    border-radius: 0;
  }
  &-circle {
    border-radius: 1000px;
  }
  &-circle&-icon-only {
    width: 32px;
    height: 32px;
    padding: 0;
    font-size: 16px;
  }
  &-circle&-icon-only&-large {
    width: 36px;
    height: 36px;
    padding: 0;
    font-size: 16px;
  }
  &-circle &-icon-only &-large {
    width: 24px;
    height: 24px;
    padding: 0;
    font-size: 14px;
  }
  &-circle&-icon-only:not(a) > .z-icon {
    vertical-align: baseline;
  }

  &-radius {
    border-radius: 4px;
  }
  &-radius&-icon-only {
    border-radius: 4px;
  }
  &-radius&-large {
    border-radius: 3px;
  }
  &-radius&-small {
    border-radius: 4px;
  }
  &-radius&-icon-only&-large {
    border-radius: 4px;
  }
  &-radius&-icon-only&-small {
    border-radius: 3px;
  }

  // type
  &-border {
    color: @colorTextContent;
    background: 0 0;
  }
  &-dashed&-primary,
  &-border&-primary {
    color: @colorPrimary;
    &:hover {
      background-color: @colorPrimaryFade;
    }
  }
  &-dashed&-info,
  &-border&-info {
    color: @colorInfo;
    &:hover {
      background-color: @colorInfo;
    }
  }
  &-dashed&-success,
  &-border&-success {
    color: @colorSuccess;
    &:hover {
      background-color: @colorInfoFade;
    }
  }
  &-dashed&-warning,
  &-border&-warning {
    color: @colorWarning;
    &:hover {
      background-color: @colorWarningFade;
    }
  }
  &-dashed&-error,
  &-border&-error {
    color: @colorError;
    &:hover {
      background-color: @colorErrorFade;
    }
  }

  &-dashed {
    border-style: dashed;
    background: 0 0;
  }
}
</style>
