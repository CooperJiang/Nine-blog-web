<template>
  <div>
    <div v-if="userInfo" class="dropdown-menu-wrap">
      <btn
        :to="{ path: '/user' }"
        theme="gradient"
        size="small"
        shape="circle"
        icon="user"
        >{{ userInfo.nickname || userInfo.username }}</btn
      >
      <div :class="['dropdown-menu', `dropdown-menu-${theme}`]">
        <concave-radius-box :size="18" :theme="theme">
          <!-- <btn
            :theme="theme === 'white' ? 'text' : 'white'"
            :to="{ path: '/user/write' }"
            icon="home"
            shape="rect"
            long
            >发布文章</btn
          > -->
          <!-- <btn
            :theme="theme === 'white' ? 'text' : 'white'"
            :to="{ path: '/article' }"
            icon="update_avatar"
            shape="rect"
            long
            >修改头像</btn
          > -->
          <!-- <btn
            :theme="theme === 'white' ? 'text' : 'white'"
            :to="{ path: '/user/profile' }"
            icon="home"
            shape="rect"
            long
            >编辑资料</btn
          > -->
          <btn
            :theme="theme === 'white' ? 'text' : 'white'"
            icon="log_out"
            shape="rect"
            long
            @click="handleSignOut"
            >退出账号</btn
          >
        </concave-radius-box>
      </div>
    </div>
    <btn-group v-else>
      <btn
        theme="assist"
        size="small"
        shape="circle"
        icon="sign-in"
        @click="handleSignUp"
        >注册</btn
      >
      <btn
        theme="primary"
        size="small"
        shape="circle"
        icon="sign-out"
        @click="handleSignIn"
        >登录</btn
      >
    </btn-group>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Btn from '@/components/base/Btn'
import BtnGroup from '@/components/base/BtnGroup'
import ConcaveRadiusBox from '@/components/kit/ConcaveRadiusBox'

export default {
  name: 'LoginControl',
  components: {
    Btn,
    BtnGroup,
    ConcaveRadiusBox
  },
  props: {
    theme: {
      type: String,
      default: () => ''
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    ...mapActions({
      toggleSignUpModal: 'toggleSignUpModal',
      toggleSignInModal: 'toggleSignInModal'
    }),

    handleSignIn() {
      this.toggleSignInModal(true)
      this.toggleSignUpModal(false)
    },

    handleSignUp() {
      this.toggleSignInModal(false)
      this.toggleSignUpModal(true)
    },

    handleSignOut() {
      sessionStorage.clear()
      this.$store.dispatch('changeUserInfo', null)
      this.$store.dispatch('changeToken', '')
      this.$toast.success('已退出登录！')
      this.$store.dispatch('changeShowMenu', false)
    }
  }
}
</script>

<style lang="less" scoped>
.dropdown-menu-wrap {
  position: relative;
  .dropdown-menu {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 99;
    display: none;
    color: #fff;
    line-height: initial;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .dropdown-menu-white {
    background-color: rgba(255, 255, 255, 0.9);
  }
  .dropdown-menu-blake {
    background-color: @colorTextTitle;
  }
  &:hover .dropdown-menu {
    display: block;
  }
}
</style>
