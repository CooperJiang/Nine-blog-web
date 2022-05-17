<template>
  <div class="persional">
    <div class="persional-item flex_center line">
      <div class="header">
        <upload
          id="avatar"
          :url="params.avatar"
          :success="updateAvatarSuccess"
        />
        <span class="uid"> UUID：{{completion(userInfo.userId)}}</span>
      </div>
    </div>
    <div class="persional-item">
      <span class="lable">您的姓名:</span>
      <span class="value">
        <input v-model="params.username" class="input" type="text" />
      </span>
    </div>
    <div class="persional-item">
      <span class="lable">您的昵称:</span>
      <span class="value">
        <input v-model="params.nickname" class="input" type="text" />
      </span>
    </div>
    <div class="persional-item">
      <span class="lable">个性签名:</span>
      <span class="value">
        <textarea v-model="params.sign" class="input sign" type="text" />
      </span>
    </div>
    <div class="persional-item">
      <span class="btn">
        <btn :loading="false" theme="warning" @click.stop="proxyClick">
          专属背景
        </btn>
        <btn style="margin-left: 10px" theme="primary" @click="updateInfo">更新资料</btn>
      </span>
    </div>
    <upload
      id="bgUpload"
      width="0"
      height="0"
      class="updateBg"
      :success="updateBgSuccess"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Upload from '@/components/base/Upload'
import Btn from '@/components/base/Btn'

export default {
  name: 'PersonalTion',
  components: { Upload, Btn },
  data() {
    return {
      params: {
        username: null,
        nickname: null,
        sign: '每个人都有签名、刚好我也有!'
      }
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo
    }
  },
  watch: {
    userInfo(n) {
      const U = JSON.parse(JSON.stringify(n))
      this.params = U
    }
  },
  created() {
    this.getUserInfo()
  },
  mounted() {},
  methods: {
    ...mapActions({ handleChangeUserInfo: 'changeUserInfo' }),
    async updateAvatarSuccess(val) {
      await this.$API.user.update({ avatar: val.data[0].url })
      await this.getUserInfo()
      this.$emit('updateUserInfo')
    },
    async updateBgSuccess(val) {
      await this.$API.user.update({ roomBg: val.data[0].url })
      await this.getUserInfo()
      this.$emit('updateUserInfo')
    },
    async getUserInfo() {
      const user = await this.$API.user.getInfo()
      this.handleChangeUserInfo(user.userInfo)
    },
    proxyClick() {
      document.getElementById('bgUpload').click()
    },
    async updateInfo(){
      const { username, nickname, sign } = this.params
      await this.$API.user.update({ username, nickname, sign })
      this.$toast.success('修改个人信息成功...')
      await this.getUserInfo()
      this.$emit('updateUserInfo')
    },
    completion(id){
      if(id < 10){
        return `10000${id}`
      }
      if(id >= 10 && id <= 99){
        return `1000${id}`
      }
      if(id >= 100 && id <= 1000){
        return `100${id}`
      }
    }
  }
}
</script>
<style lang="less" scoped>
.persional {
  .line {
    border-top: 1px solid #eee;
  }
  &-item {
    padding: 10px 30px;
    display: flex;
    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 6px;
    }
    .lable {
      color: #606266;
      font-size: 14px;
      margin-right: 14px;
    }
    .value {
      flex: 1;
      width: 0;
      color: #606266;
      border: 1px solid #d2d0d0;
      border-radius: 5px;
      background: transparent;
      .input {
        border: none;
        outline: none;
        padding: 6px 15px;
        font-size: 12px;
        background: transparent;
        color: #606266;
      }
      .sign {
        width: 100%;
        overflow: hidden;
        position: relative;
        height: 50px;
        padding: 10px 15px;
        line-height: 18px;
        resize: none;
        outline: none;
        font-size: 12px;
        color: #606266;
        border-radius: 5px;
        background-color: transparent;
      }
    }

    .btn {
      flex: 1;
      display: flex;
      align-items: center;
      margin-left: 74px;
    }

    .header {
      display: flex;
      flex-direction: column;
      align-items: center;
      .uid {
        background-color: #ccc;
        display: inline-block;
        color: #fff;
        border-radius: 3px;
        padding: 2px 5px;
        font-size: 12px;
        margin-top: 10px;
        font-weight: 500;
        /* stylelint-disable */
        font-family: 'webfont';
      }
    }
  }
}
</style>
