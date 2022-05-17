<template>
  <div
    class="app-header-wrapper"
    :style="{ color: textColor, background: bgColor }"
    :class="[headerClass]"
  >
    <div class="s-container">
      <div class="app-header">
        <router-link to="/" class="app-header-brand">
          <!-- <logo :h="38"  /> -->
          <icon icon="logo-before" :size="32" />
          <icon icon="logo" :size="32" />
          <icon icon="logo3" :size="32" />
          <icon icon="logo4" :size="32" />
          <icon icon="logo5" :size="32" />
        </router-link>
        <app-menu />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppMenu from '@/components/layout/AppMenu/AppMenu'
// import Logo from '@/components/base/Logo'
import Icon from '@/components/base/Icon'
export default {
  name: 'AdminHeader',
  components: {
    AppMenu,
    // Logo,
    Icon
  },
  data() {
    return {
      isShow: true,
      currentHeight: 0,
      headerClass: 'fixed-top',
      scrollTop: 0,
      whiteList: ['/','/resource','/message','/project','/chat','/tool-house']
    }
  },
  computed: {
    ...mapGetters(['isShowMenu']),
    textColor() {
      if(this.whiteList.includes(this.$route.path) && this.scrollTop < 150){
        return '#fff'
      }else{
        return '#4c4948'
      }
    },
    bgColor() {
      return this.isShowMenu || !this.whiteList.includes(this.$route.path)
        ? 'rgba(255, 255, 255, 0.9)'
        : 'transparent'
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handlerScrollNav)
  },
  methods: {
    handlerScrollNav() {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      this.scrollTop = scrollTop
      const scroll = scrollTop - this.currentHeight
      this.currentHeight = scrollTop
      // if (this.isShowMenu || !this.whiteList.includes(this.$route.path)) return

      if (scrollTop < 100) {
        this.headerClass = 'fixed-top'
      } else if (scroll < 0) {
        this.headerClass = 'slideDown'
      } else {
        this.headerClass = 'slideUp'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.app-header-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.9);
  color: @colorTextTitle;
  transition: color .2s;
  transition: transform 0.8s;

  .app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: @heightHeader;
  }
}
.fixed-top {
  background: transparent;
}
.slideDown {
  background: rgba(255, 255, 255, 0.8) !important;
}
.slideUp {
  transform: translateY(-100px);
}
@media only screen and (max-width: @breakpoints-lg) {
  .app-header-wrap {
    background-color: rgba(255, 255, 255, 0.95);
  }
}
@media only screen and (max-width: 375px) {
  .app-header-wrapper {
    width: 375px;
  }
}
</style>
