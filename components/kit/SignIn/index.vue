<template>
  <modal v-if="showSignInModal" @close="handleCloseModel">
    <h3 slot="header">登录</h3>
    <div slot="body">
      <input
        v-model="formData.username"
        class="common-input"
        type="text"
        placeholder="用户名、或邮箱"
        style="width: 100%"
        @keyup.enter="login"
      />
      <input
        v-model="formData.password"
        class="common-input"
        type="password"
        placeholder="密码"
        style="width: 100%"
        @keyup.enter="login"
      />
      <div style="text-align: right">
        <span
          style="font-size: 12px; color: #999; cursor: pointer"
          @click="handleForgetPwd"
          >忘记密码？</span
        >
      </div>
    </div>
    <div slot="footer">
      <btn :loading="isLoginLoading" theme="gradient" long @click="login"
        >确定登录</btn
      >
      <btn long style="margin-top: 10px" @click="goToRegister">我要注册</btn>
    </div>
  </modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Modal from '@/components/base/Modal'
import Btn from '@/components/base/Btn'
export default {
  name: 'SignIn',
  components: {
    Modal,
    Btn
  },
  data() {
    return {
      formData: {
        username: '',
        password: ''
      },
      isLoginLoading: false
    }
  },
  computed: {
    ...mapGetters(['showSignInModal'])
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    ...mapActions({
      toggleSignInModal: 'toggleSignInModal',
      handleChangeToken: 'changeToken',
      handleChangeUserInfo: 'changeUserInfo',
      changeShowMenu: 'changeShowMenu'
    }),
    /**
     * @desc 请求 登录
     */
    async requestLogin() {
      this.isLoginLoading = true
      try {
        const res = await this.$API.user.login(this.formData)
        this.handleChangeToken(res.token)
        this.getUserInfo()
      } catch (error) {
        this.isLoginLoading = false
      }
    },

    /** 获取个人信息 */
    async getUserInfo() {
      const user = await this.$API.user.getInfo()
      this.handleChangeUserInfo(user.userInfo)
      this.isLoginLoading = false
      this.$toast.success('登录成功')
      this.handleCloseModel()
      this.changeShowMenu(false)
      this.$emit('loginSuccess')
    },

    login() {
      this.validateFormData().then((isvalid) => {
        if (isvalid) {
          this.requestLogin()
        }
      })
    },

    handleForgetPwd() {
      this.$router.push('/forget_pwd')
      this.$store.dispatch('toggleSignInModal', false)
      this.$store.dispatch('toggleSignUpModal', false)
    },

    goToRegister() {
      this.$store.dispatch('toggleSignInModal', false)
      this.$store.dispatch('toggleSignUpModal', true)
    },

    validateFormData() {
      return new Promise((resolve) => {
        if (!this.formData.username) {
          this.$toast.error('请输入昵称')
          return resolve(false)
        }
        if (!this.formData.password) {
          this.$toast.error('请输入密码')
          return resolve(false)
        }
        return resolve(true)
      })
    },

    handleCloseModel() {
      this.toggleSignInModal(false)
    }
  }
}
</script>
