<template>
  <div class="online">
    <div v-if="!isCreate">
      <!-- 房间列表 -->
      <div
        v-for="(item, index) in recommendRoomList"
        :key="index" :class="['online-item', { 'official' : item.roomId == 888  },, { 'active' : item.roomId == roomId  } ]"
        @click="joinRoom(item)"
      >
        <img class="online-item-avatar" :src="item.roomLogo" />
        <icon v-if="item.roomId == mineRoomId" icon="chat-mine-room" :size="20" class="mine-room" />
        <div class="online-item-info">
          <div class="online-item-info-name">
            <span><span class="room-num">({{item.onlineUserNums}})</span>{{ item.roomName }}</span>
            <span v-if="item.roomId == 888" class="role hall" >官方大厅888</span>
            <span v-if="item.isNeedPassword" class="role">
              <icon icon="chat-room-info-pass" :size="14" class="icon" />
            </span>
          </div>
          <div class="online-item-info-desc s-1-line">
            {{item.roomNotice}}
          </div>
        </div>
      </div>
    </div>
    <modal v-if="showModal" show-cancel-button confirm-button-text="确认加入" cancel-button-text="暂不加入" @confirm="confirm" @cancel="cancel">
      <div slot="header">加入新房间</div>
      <div slot="content">是否退出当前房间并加入新的房间？</div>
    </modal>

    <!-- 创建房间 -->
    <div v-if="isCreate" class="create">
      <div class="create-item">
        <span class="lable">房间名称:</span>
        <span class="value">
          <input v-model="params.roomName" placeholder="个人房间名称" class="input" type="text" />
        </span>
      </div>
      <div class="create-item">
        <span class="lable">房间靓号:</span>
        <span class="value">
          <input v-model="params.roomId" placeholder="自定义三位数" class="input" type="number" />
        </span>
      </div>
      <div class="create-item">
        <span class="lable">房间公告:</span>
        <span class="value">
          <textarea v-model="params.roomNotice" placeholder="房间公告 加入英文,符号、即可换行" class="input sign" type="text" />
        </span>
      </div>
      <div class="persional-item">
          <btn style="float: right; margin-right: 28px" theme="gradient" size="small" @click="createRoom">创建房间</btn>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex"
import Icon from '@/components/base/Icon'
import Modal from '@/components/chat/Modal/index.vue'
import Btn from '@/components/base/Btn'

export default {
  name: 'RoomInfo',
  components: { Icon, Modal, Btn },
  props: {
    isCreate: {
      type: Boolean,
      default: () => false
    }
  },
  data(){
    return{
      showModal: false,
      activeRoomId: null,
      params: {
        roomName: null,
        roomNotice: null,
        roomId: null
      }
    }
  },
  computed: {
    ...mapGetters(['recommendRoomList', 'roomId', 'mineRoomId']),
  },
  methods:{
    ...mapMutations(['setRoomId']),
    joinRoom(room){
      const { roomId } = room
      if(Number(roomId) === this.roomId){
        return this.$message.info("已经在当前房间了")
      }
      this.activeRoomId = Number(roomId)
      this.showModal = true
    },
    confirm(){
      this.setRoomId(Number(this.activeRoomId))
    },
    cancel(){
      this.showModal = false
    },
    async createRoom(){
      const { roomName, roomId, roomNotice } = this.params;
      if(roomId.length !== 3 || !roomId ){
        return this.$toast.error("请输入三位数格式的房间号码！")
      }
      if(!roomName || !roomNotice) {
        return this.$toast.error("请按要求填写正确的房间信息！")
      }
      await this.$API.chat.createRoom(this.params)
      this.$emit('createRoomSuccess')
    }
  }
}
</script>
<style lang="less" scoped>
.online {
  display: flex;
  flex-direction: column;
  height: 440px;
  overflow: hidden;
  overflow-y: auto;
  &-item {
    cursor: pointer;
    padding: 10px;
    display: flex;
    align-items: center;
    transition: all 0.3s;
    border-left: 3px solid transparent;
    padding-left: 8px;
    position: relative;
    .mine-room{
      position: absolute;
      top: 5px;
      left: 0;
    }
    &:hover {
      border-left: 3px solid #1295dd;
    }
    &-avatar {
      width: 40px;
      height: 40px;
      border-radius: 5px;
      margin-right: 10px;
    }
    &-info {
      display: flex;
      flex-direction: column;
      flex: 1;
      width: 0;
      &-name {
        font-size: 14px;
        color: #000;
        font-weight: 500;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .role {
          background-color: #ccc;
          font-size: 12px;
          color: #fff;
          padding: 1px 10px;
          margin-right: 3px;
          border-radius: 3px;
        }
        .hall{
          background: #000;
          color: #fff;
        }
        .room-num{
          margin-right: 5px;
          color: red;
        }
      }
      &-desc {
        font-size: 12px;
        margin-top: 8px;
        color: #aaa;
      }
    }
  }
  .official{
    border-bottom: 3px solid #eee;
    border-top: 1px solid #f5f5f5;
    margin-bottom: 15px;
  }
  .active{
    border-right: 3px solid #521cd373;
  }

  .create{
    transition: all .3s;
    padding: 10px 15px;
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
        width: 100%;
      }
      input::-webkit-input-placeholder{
        color:#969494;
      }

      .input::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
      .input::-webkit-outer-spin-button {
        -webkit-appearance: none;
      }
      textarea::-webkit-input-placeholder{
        color:#969494;
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
      float: right;
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
}

</style>


