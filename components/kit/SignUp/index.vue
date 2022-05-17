<template>
  <modal v-if="showSignUpModal" @close="handleCloseModel">
    <h3 slot="header">注册</h3>
    <div slot="body">
      <input
        v-model="formData.username"
        class="common-input"
        type="text"
        placeholder="用户名"
        autocomplete="off"
      />
      <input
        v-model="formData.nickname"
        class="common-input"
        type="text"
        placeholder="昵称"
        autocomplete="off"
      />
      <input
        v-model="formData.email"
        class="common-input"
        name="username"
        type="text"
        value=" "
        placeholder="邮箱"
        autocomplete="off"
      />
      <input
        v-model="formData.password"
        class="common-input"
        type="password"
        placeholder="密码"
        autocomplete="off"
        @keyup.enter="singUp"
      />
      <input
        v-model="formData.confirmPassword"
        class="common-input"
        type="password"
        placeholder="确认密码"
        autocomplete="off"
        @keyup.enter="singUp"
      />
    </div>
    <div slot="footer">
      <btn :loading="isSignUpLoading" theme="gradient" long @click="singUp"
        >确定注册</btn
      >
      <btn long style="margin-top: 10px" @click="goToLogIn">直接登录</btn>
        <label  style="margin-top: 10px;font-size: 12px;color:#706c6c" class="flex_start">
          <input v-model="isUseEmailVer" type="checkbox" style="margin-right: 6px" > 我不想验证邮箱！
        </label>
    </div>
  </modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Modal from '@/components/base/Modal'
import Btn from '@/components/base/Btn'

import { validatorsExp } from '@/assets/js/validate'

export default {
  name: 'SignUp',
  components: {
    Modal,
    Btn
  },
  data() {
    return {
      formData: {},
      isSignUpLoading: false,
      isUseEmailVer: false, // 不使用邮箱验证
    }
  },
  computed: {
    ...mapGetters(['showSignUpModal'])
  },
  methods: {
    ...mapActions({
      toggleSignUpModal: 'toggleSignUpModal'
    }),

    async requestSingUp() {
      this.isSignUpLoading = true
      try {
        this.formData.isUseEmailVer = this.isUseEmailVer
        const res = await this.$API.user.register(this.formData)
        if(res === "请前往邮箱激活您的账号用户登录系统！"){
          this.$toast.success(res)
        }else{
          this.$store.dispatch('changeUserInfo', res.result)
          this.$toast.success('注册成功,请登录')
        }
        this.isSignUpLoading = false
        this.goToLogIn()
      } catch (error) {
        this.isSignUpLoading = false
      }
    },

    singUp() {
      this.validateFormData().then((isvalid) => {
        if (isvalid) {
          this.requestSingUp()
        }
      })
    },

    goToLogIn() {
      this.$store.dispatch('toggleSignUpModal', false)
      this.$store.dispatch('toggleSignInModal', true)
    },

    validateFormData() {
      const { username, nickname, email, password, confirmPassword } =
        this.formData
      return new Promise((resolve) => {
        if (!username) {
          this.$toast.error('请填写用户名！')
          return resolve(false)
        }
        if (!nickname) {
          this.$toast.error('请填写昵称！')
          return resolve(false)
        }
        if (!validatorsExp.email.test(email)) {
          this.$toast.error('请正确填写邮箱！')
          return resolve(false)
        }
        if (!password) {
          this.$toast.error('请填写密码！')
          return resolve(false)
        }
        if (password.length < 6) {
          this.$toast.error('密码至少为 6 位')
          return resolve(false)
        }
        if (!confirmPassword) {
          this.$toast.error('请再次确认密码')
          return resolve(false)
        }
        if (password !== confirmPassword) {
          this.$toast.error('密码不一致')
          return resolve(false)
        }
        return resolve(true)
      })
    },

    /**
     * @desc 关闭弹框
     */
    handleCloseModel() {
      this.toggleSignUpModal(false)
    }
  }
}
</script>
