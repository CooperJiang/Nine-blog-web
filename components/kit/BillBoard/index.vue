<template>
  <div
    :class="[
      'billboard',
      isHomePage ? 'billboard-homepage' : '',
      isPage ? 'billboard-page' : ''
    ]"
    :style="wrapStyles"
  >
    <div :style="posterStyles" class="billboard-poster"></div>
    <div class="billboard-box">
      <div class="billboard-inner">
        <h1 v-if="title" class="billboard-inner-slogan">{{ title }}</h1>
        <p v-if="titleSub" class="billboard-inner-slogan-sub">{{ titleSub }}</p>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Billboard',
  props: {
    title: {
      type: String,
      default: () => ''
    },
    titleSub: {
      type: String,
      default: () => ''
    },
    height: {
      type: [Number, String],
      default: '250px'
    },
    posterBlue: {
      type: [Number, String],
      default: '15px'
    },
    poster: {
      type: String,
      default: () => ''
    },
    sticky: Boolean,
    isHomePage: Boolean,
    isPage: Boolean
  },
  computed: {
    bgSrc() {
      return this.poster || require('@/assets/images/home/banner_project.gif')
    },
    wrapStyles() {
      return {
        position: this.sticky ? 'sticky' : 'relative',
        height:
          typeof this.height === 'number' ? `${this.height}px` : this.height
      }
    },
    posterStyles() {
      return {
        backgroundImage: `url(${this.bgSrc})`,
        filter:
          typeof this.height === 'number'
            ? `blur(${this.posterBlue}px)`
            : `blur(${this.posterBlue})`,
        top:
          typeof this.height === 'number'
            ? `-${this.posterBlue}px`
            : `-${this.posterBlue}`,
        bottom:
          typeof this.height === 'number'
            ? `-${this.posterBlue}px`
            : `-${this.posterBlue}`,
        left:
          typeof this.height === 'number'
            ? `-${this.posterBlue}px`
            : `-${this.posterBlue}`,
        right:
          typeof this.height === 'number'
            ? `-${this.posterBlue}px`
            : `-${this.posterBlue}`
      }
    }
  },
  methods: {
    getDate() {
      const now = new Date()
      return `${now.getMonth()}${now.getDate()}`
    }
  }
}
</script>

<style lang="less" scoped>
@billboardHeight: 250px;
.billboard {
  position: relative;
  top: 0;
  width: 100%;
  height: @billboardHeight;
  overflow: hidden;
  &-poster {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-size: cover;
    background-repeat: no-repeat;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
  &-homepage {
    padding-top: @heightHeader;
    .billboard-poster {
      background-position: center bottom;
      background-attachment: fixed;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  &-box {
    position: relative;
    display: inline-table;
    width: 100%;
    height: 100%;
    padding: 20px;
  }

  &-inner {
    width: 100%;
    height: 100%;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
  &-inner-slogan {
    font-size: 28px;
    font-weight: normal;
    margin-bottom: 5px;
    color: #fff;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  }
  &-inner-slogan-sub {
    display: inline-block;
    color: #fff;
    font-size: 14px;
    padding: 2px 8px;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.2);
    margin-bottom: 10px;
  }
  &-page {
    .billboard-inner-slogan {
      padding: 60px 30px 0;
      font-size: 36px;
      font-weight: normal;
      margin-bottom: 5px;
      color: #fff;
      text-shadow: 0 4px 8px rgba(7, 17, 27, 0.4);
      letter-spacing: 5px;
      user-select: none;
    }
    .billboard-inner-slogan-sub {
      // font-family: Roboto;
      font-size: 28px;
      color: #fff;
      background: transparent;
      text-shadow: 0 4px 8px rgba(7, 17, 27, 0.4);
      letter-spacing: 5px;
      user-select: none;
    }
  }
}
</style>
