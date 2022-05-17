<template>
  <div :class="classes" :style="stylesWrap" class="z-card">
    <h3 v-if="title" class="z-card-header">{{ title }}</h3>
    <div :style="stylesBody" class="z-card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  components: {},
  props: {
    title: {
      type: String,
      default: () => ""
    },
    hover: Boolean,
    shadow: Boolean,
    padding: {
      type: [String, Number],
      default: '20px'
    },
    borderRadius: {
      type: [String, Number],
      default: '0px'
    }
  },
  computed: {
    classes() {
      return {
        [`z-card-hover`]: this.hover,
        [`z-card-shadow`]: this.shadow
      }
    },
    stylesWrap() {
      return {
        borderRadius: typeof this.borderRadius === 'number' ? `${this.borderRadius}px` : this.borderRadius
      }
    },
    stylesBody() {
      return {
        padding: typeof this.padding === 'number' ? `${this.padding}px` : this.padding
      }
    }
  }
}
</script>

<style lang="less" scoped>
.z-card {
  background-color: #fff;
  transition: all 0.2s linear;
  .z-card-shadow {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  }
  .z-card-hover:hover {
    transform: translate3d(0, -2px, 0);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
  .z-card-header {
    font-size: 18px;
    line-height: 50px;
    text-align: center;
    font-weight: bold;
    border-bottom: 1px solid @colorBorderLight;
    color: @colorTextTitle;
  }
  .z-card-body {
    height: 100%;
  }
}
</style>
