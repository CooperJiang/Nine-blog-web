<template>
  <div class="persional">
    <div class="persional-item flex_center line">
      <div class="header">
        <upload
          id="avatar"
          :url="params.roomLogo"
          :success="updateRoomLogoSuccess"
        />
        <span class="uid"> 专属房间LOGO</span>
      </div>
    </div>
    <!-- <div class="persional-item">
      <span class="lable">房间密码:</span>
      <span class="value">
        <input v-model="params.password" class="input" type="text" placeholder="密码功能开发ing" />
      </span>
    </div> -->
    <div class="persional-item">
      <span class="lable">房间名称:</span>
      <span class="value">
        <input v-model="params.roomName" class="input" type="text" />
      </span>
    </div>
    <div class="persional-item">
      <span class="lable">房间公告:</span>
      <span class="value">
        <textarea v-model="params.roomNotice" class="input sign" type="text" />
      </span>
    </div>
    <div class="persional-item">
      <span class="btn">
        <btn style="margin-left: 10px" theme="primary"  @click="updateRoomInfo">更新资料</btn>
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Upload from '@/components/base/Upload'
import Btn from '@/components/base/Btn'

export default {
  name: 'PersonalTion',
  components: { Upload, Btn },
  data() {
    return {
      params: {
        roomName: null,
        roomNotice: null,
        roomLogo: null
      }
    }
  },
  computed: {
    ...mapGetters(['mineRoomId']),
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
    this.queryMineRoomInfo()
  },
  mounted() {},
  methods: {
    ...mapActions({ handleChangeUserInfo: 'changeUserInfo' }),
    async updateRoomLogoSuccess(val) {
      await this.$API.chat.updateRoom({ roomLogo: val.data[0].url })
      this.queryMineRoomInfo()
    },
    async updateBgSuccess(val) {
      console.log('val: ', val);
      await this.$API.user.update({ roomBg: val.data[0].url })
      await this.getUserInfo()
      this.$emit('updateUserInfo')
    },

    async updateRoomInfo(){
      const { roomName, roomNotice } = this.params
      await this.$API.chat.updateRoom({ roomName, roomNotice })
      this.$toast.success('修改房间信息成功...')
      this.$socket.client.emit("updateRoomInfo", this.mineRoomId)
      await this.queryMineRoomInfo()
    },
    async queryMineRoomInfo(){
      const res = await this.$API.chat.roomInfo({roomId: this.mineRoomId})
      const { roomName, roomLogo, roomNotice } = res
      Object.assign(this.params, { roomName, roomLogo, roomNotice })
    }
  }
}
</script>
<style lang="less" scoped>
.persional {
  height: 365px;
  overflow-y: scroll;
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
      input::-webkit-input-placeholder{
        color:#cac5c5;
      }
      .sign {
        width: 100%;
        overflow: hidden;
        position: relative;
        height: 80px;
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
.updateBg {
  // display: none;
}
</style>
