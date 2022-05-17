<template>
  <div>
    <div class="app-menu" :class="classes">
      <div class="app-menu-handle" @click="handleToggleMenu">
        <Icon icon="menu" :size="22" />
      </div>
      <ul class="app-menu-list">
        <li
          v-for="(nav, index) in navList"
          :key="index"
          class="app-menu-list-item"
        >
          <nuxt-link
            :to="nav.path"
            class="app-menu-link"
            active-class="current"
          >
            {{ nav.name }}
          </nuxt-link>
        </li>
        <li class="app-menu-list-item app-menu-login">
          <login-control :theme="theme" />
        </li>
      </ul>
    </div>
    <div
      v-if="isShowMenu"
      class="app-menu-mask"
      @click="handleToggleMenu"
    ></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LoginControl from '@/components/layout/AppMenu/LoginControl'
import Icon from '@/components/base/Icon'
export default {
  components: { Icon, LoginControl },
  props: {
    // theme: {
    //   type: String,
    //   default: 'white'
    // }
  },
  data() {
    return {
      navList: [
        {
          name: '个人文章',
          path: '/article'
        },
        // {
        //   name: '前端资源',
        //   path: '/resource'
        // },
        {
          name: '百宝箱',
          path: '/tool-house'
        },
        {
          name: '留言板',
          path: '/message'
        },
        {
          name: '作品集',
          path: '/project'
        },
        {
          name: '聊天室',
          path: '/chat'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['isShowMenu']),
    classes() {
      return [this.isShowMenu ? 'app-menu-show' : '', `app-menu-${this.theme}`]
    },
    theme() {
      const whiteList = ['/','/resource','/message','/project','/chat']
      return whiteList.includes(this.$route.path) ? 'blake' : 'white'
    }
  },
  watch: {
    $route(n, o) {
      this.changeShowMenu(false)
    }
  },
  methods: {
    ...mapActions({
      changeShowMenu: 'changeShowMenu'
    }),
    handleToggleMenu() {
      this.changeShowMenu(!this.isShowMenu)
    }
  }
}
</script>

<style lang="less">
.app-menu-mask {
  position: fixed;
  top: @heightHeader;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 990;
  background-color: rgba(0, 0, 0, 0.3);
}
.app-menu {
  padding: 0 10px;
  .app-menu-handle {
    display: none;
  }
  &-list {
    transition: all 0.6s;
    // opacity: 0;
    &-item {
      margin: 0 8px;
      display: inline-block;
      line-height: @heightHeader;
      .app-menu-link {
        display: block;
        line-height: @heightHeader;
        position: relative;
        padding: 0 20px;
        font-size: 16px;
        cursor: pointer;
        transition: color 0.25s ease;
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          height: 2px;
          width: 0;
          border-radius: 2px;
          background-image: @color;
          transition: all 0.3s ease;
        }
        &:hover {
          background: @color;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          color: @colorPrimary;
          &::after {
            width: 100%;
            left: 0;
          }
        }
        &.current {
          color: transparent;
          color: @colorPrimary;
          font-weight: 600;
          background: @color;
          -webkit-background-clip: text;
          &::after {
            width: 100%;
            left: 0;
          }
        }
      }
    }
  }
}
@media only screen and (max-width: @breakpoints-lg) {
  .app-menu {
    color: @colorTextTitle;
    .app-menu-handle {
      display: block;
    }
    &-list {
      height: 0;
      position: fixed;
      width: 100%;
      top: @heightHeader;
      left: 0;
      z-index: 1000;
      overflow: hidden;
      background-color: rgba(255, 255, 255, 0.9);
      &-item {
        display: block;
        text-align: center;
        line-height: 50px;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        .app-menu-login {
          margin-right: 0;
          vertical-align: top;
          &::after {
            display: none;
          }
        }
      }
      .app-menu-link {
        line-height: 50px;
        &::after {
          display: none;
        }
        &.current {
          font-weight: 600;
          background: @color;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          color: @colorPrimary;
        }
        &:hover {
          background: @color;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          color: @colorPrimary;
        }
      }
    }
    &.app-menu-show .app-menu-list {
      opacity: 1;
      // height: auto;
      height: 305px;
      overflow: inherit;
      top: @heightHeader;
    }
  }
}
@media only screen and (max-width: 375px) {
  .app-menu-list {
    width: 375px !important;
  }
}
</style>
