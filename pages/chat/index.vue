<template>
  <chat-bg ref="bg">
    <div class="chat" :style="{background: isShowCustomBg ? `url(${roomBg})` : ''}" >
      <transition name="fade" mode="out-in">
        <div v-show="isShowBoard" class="chat-container">
          <chat-box :options="options1">
            <on-line-info :on-line-user="onlineUserInfo" />
          </chat-box>
          <chat-box :options="options2">
            <span slot="header" class="create-room" @click="createOrJoinRoom"> <icon icon="chat-mine" class="icon" :size="13" />{{roomBtnText}}</span>
            <room-info :is-create="isCreate" @createRoomSuccess="createRoomSuccess" />
          </chat-box>
          <chat-box :options="options3">
            <personal-info @updateUserInfo="updateUserInfo" />
          </chat-box>
          <chat-box :options="options5">
            <room-config  />
          </chat-box>
          <div v-if="roomInfo" class="chat-container-header">
            <div class="header-left">
              <div class="room-id">ID:{{roomInfo.roomId}}</div>
              <div class="room-name visible-xl visible-lg ">{{roomInfo.roomName}}</div>
              <div class="room-share" :data-clipboard-text="copyText" @click="copy">
                <icon icon="share" :size="14" class="icon" /> <span  class="visible-xl visible-lg ">分享</span>
              </div>
            </div>
            <!-- <Icon icon="chat-online" /> -->
            <div class="header-center  visible-xl ">
              <chat-tips />
            </div>

            <div class="header-right">
              <span class="item">
                <span v-if="mineRoomId == roomId" class="flex_center" @click.stop="openBox(5)">
                  <icon icon="chat-room-config" class="icon" :size="16" />
                  <span class="visible-xl visible-lg ">
                    操作
                  </span>
                </span>
              </span>
              <span class="item">
                <span class="flex_center" @click.stop="openGit">
                  <icon icon="github" class="icon" :size="16" />
                  <span class="visible-xl visible-lg ">
                    开源
                  </span>
                </span>
              </span>
              <span class="item">
                <span class="flex_center" @click.stop="openBox(1)">
                  <icon icon="chat-online" class="icon" :size="16" />
                  <span class="visible-xl visible-lg ">
                    在线[{{ onlineUserInfo.length }}]
                  </span>
                </span>
              </span>
              <span class="item" @click.stop="openBox(2)">
                <span class="flex_center">
                  <icon icon="chat-room" class="icon" :size="16" />
                  <span class="visible-xl visible-lg "> 房间[{{recommendRoomList.length}}]</span>
                </span>
              </span>
              <span class="item" @click.stop="openBox(3)">
                <span class="flex_center">
                  <icon icon="chat-mine" class="icon" :size="16" />
                  <span class="visible-xl visible-lg ">我的</span>
                </span>
              </span>
              <span class="item" @click.stop="$router.push('/')">
                <span class="flex_center">
                  <icon icon="chat-exit" class="icon" :size="16" />
                  <span class="visible-xl visible-lg ">退出</span>
                </span>
              </span>
            </div>
          </div>

          <div class="chat-container-content">
            <div ref="test" class="chat-container-content-history">
              <message-frame
                v-if="messageInfo.length"
                ref="messageFrame"
                :message-data="messageInfo"
                @loadMoreMessage="loadMoreMessage"
                @newMsg="newMsg"
                @quoteMessage="quoteMessage"
                @recallMessafe="recallMessafe"
              />
            </div>
            <div class="chat-container-content-footer">
              <transition name="transform" mode="out-in">
                <div
                  v-if="unReadMsg"
                  class="unread"
                  @click="$refs.messageFrame.toEnd()"
                >
                  {{ `有${unReadMsg}条新消息` }}
                </div>
              </transition>
              <div class="tool">
                <toolbar
                  ref="toolbar"
                  :music-info="musicInfo"
                  :queue-music-list="queueMusicList"
                  :current-time="currentTime"
                  :start-time="startTime"
                  @emotion="handleEmotion"
                  @collectMusic="collectMusic"
                  @chooseMusic="chooseMusic"
                  @cutMusic="cutMusic"
                  @sendEmoji="sendEmoji"
                  @removeQueueMusic="removeQueueMusic"
                />
              </div>
              <div class="message">
                <music
                  v-show="false"
                  :src="musicSrc"
                  :start-time="startTime"
                  :music-lrc="musicLrc"
                  @updateLrc="updateLrc"
                />
                <textarea
                  ref="messageInput"
                  v-model.trim="message"
                  class="message-input"
                  @keydown="sendMsg"
                  @paste="pasting"
                />
                <chat-preview ref="preview" @sendImage="sendImage" />
              </div>
              <div class="lrc">
                <music-lrc :current-lrc="currentLrc" />
              </div>
            </div>
          </div>
        </div>
      </transition>

      <div>
        <modal confirm-button-text="确认加入" @confirm="confirmJoin" />
        <sign-in @loginSuccess="initSocket" />
        <sign-up />
         <transition name="fade" mode="out-in">
          <div v-show="!isShowBoard"  class="chat-board" >
            {{currentLrc}}
          </div>
        </transition>
      </div>
    </div>
  </chat-bg>
</template>

<script>
import Vue from "vue";
import axios from 'axios'
import { mapMutations, mapGetters, mapActions } from "vuex"
import Clipboard from 'clipboard'
import Config from '../../configs/clientConfig'
import SignIn from '@/components/kit/SignIn'
import SignUp from '@/components/kit/SignUp'
import Icon from '@/components/base/Icon'
import ChatBox from '@/components/chat/ChatBox/index.vue'
import OnLineInfo from '@/components/chat/OnLineInfo/index.vue'
import RoomInfo from '@/components/chat/RoomInfo/index.vue'
import MessageFrame from '@/components/chat/MessageFrame/index.vue'
import PersonalInfo from '@/components/chat/PersonalInfo/index.vue'
import RoomConfig from '@/components/chat/RoomConfig/index.vue'
import Music from '@/components/chat/Music/index.vue'
import Modal from '@/components/chat/Modal/index.vue'
import Toolbar from '@/components/chat/Toolbar/index.vue'
import MusicLrc from '@/components/chat/MusicLrc/index.vue'
import ChatTips from '@/components/chat/ChatTips/index.vue'
import ChatBg from '@/components/chat/ChatBg/index.vue'
import ChatPreview from '@/components/chat/ChatPreview/index.vue'

const banneImg = require('@/assets/images/home/banner_chat.gif')
export default {
  components: {
    SignIn,
    SignUp,
    Icon,
    ChatBox,
    OnLineInfo,
    RoomInfo,
    MessageFrame,
    PersonalInfo,
    RoomConfig,
    Music,
    Modal,
    Toolbar,
    MusicLrc,
    ChatTips,
    ChatBg,
    ChatPreview
  },
  layout: 'empty',
  data() {
    return {
      isShowBoard: false,
      banneImg,
      message: '',
      options1: {
        show: false,
        top: 60,
        right: 10,
        title: '在线用户'
      },
      options2: {
        show: false,
        top: 60,
        right: 10,
        title: '房间信息'
      },
      options3: {
        width: 360,
        height: 420,
        show: false,
        top: 60,
        right: 10,
        title: '我的信息'
      },
      options5: {
        width: 360,
        height: 420,
        show: false,
        top: 60,
        right: 10,
        title: '房间设置'
      },
      isCreate: false, // 打开创建我的房间
      messageInfo: [],
      onlineUserInfo: [],
      mineUserId: null, // 我的id 区分我和别人
      musicSrc: null,
      musicInfo: null,
      currentLrc: null,
      currentTime: 0,
      queueMusicList: [],
      musicLrc: [],
      startTime: 0,
      unReadMsg: 0,
      isShowCustomBg: true,
      lock: true,
      messageParams: {
        page: 1,
        pagesize: 100
      },
      roomInfo: {}
    }
  },
  computed: {
    ...mapGetters(['roomId','mineRoomId','recommendRoomList']),
    roomBg(){
      return this.$store.getters.userInfo?.roomBg
    },
    copyText(){
      if(!this.musicInfo) return
      const {artist,album} = this.musicInfo
      return `小九的听歌房 正在播放${artist}的 《${album}》 快来一起听听吧~  https://jiangly.com/chat`
    },
    roomBtnText(){
      return this.mineRoomId ? "我的房间" : this.isCreate ? "返回大厅" : "创建房间";
    }
  },
  watch: {
    roomId(n,o){
      if(Number(n) !== Number(o) && n ) {
        this.$socket.client.disconnect()
        this.resetRoom()
        this.initSocket()
        this.closeBox()
      }
    }
  },
  created() {
    this.$route.query.roomId && this.setRoomId(this.$route.query.roomId)
  },
  sockets: {
    async connect(data) {
      // this.$socket.client.disconnected
    },
    authFail(data) {
      this.loginAgain(data)
    },
    async joinRoomSuccess(data) {
      const {
        startTime,
        musicSrc,
        userId,
        currentMusicInfo: musicInfo,
        musicLrc,
        musicQueueList: queueMusicList,
      } = data
      Object.assign(this, {
        startTime,
        musicSrc,
        userId,
        musicInfo,
        musicLrc,
        queueMusicList
      })
      !this.musicLrc && (this.musicLrc = [])
      this.mineUserId = userId
      await this.queryHistoryMessage()
      this.$socket.client.connected && this.$toast.success(data.msg)
      await this.queryRoomInfo()
      setTimeout(() => {
        this.$socket.client.connected &&
        this.messageInfo.push({
          type: 'notice',
          content: this.roomInfo.roomNotice.split(",")
        })
      }, 1000);
    },
    newUserOnline(data) {
      const { onlineUserList, msg: content } = data
      this.onlineUserInfo = onlineUserList
      this.messageInfo.push({ type: 'info', content})
    },
    recallMessafe(data){
      const {data: id, } = data
      this.messageInfo.forEach( t => {
        if(t.id === id){
          t.type = 'info'
          t.content = `${t && t.userInfo.nickname} 撤回了一条消息`
        }
      })
      // const delIndex = this.messageInfo.findIndex( t => t.id === id)
      // this.messageInfo.splice(delIndex,1)
      // this.messageInfo.push({
      //   type: 'info',
      //   content: msg
      // })
    },
    offline(data) {
      this.onlineUserInfo = data.data
    },
    query(data) {
      this.onlineUserInfo = data.data
    },
    message(data) {
      const message = data.data
      this.messageInfo.push(message)
    },
    switchMusic(data) {
      this.musicSrc = data.data.musicSrc
      this.musicInfo = data.data.musicInfo
      this.musicLrc = data.data.musicLrc
      !this.musicLrc && (this.musicLrc = [])
      this.queueMusicList = data.data.queueMusicList
      this.messageInfo.push({ type: 'info', content: data.msg })
    },
    collectMusic(data) {
      const { code, msg } = data
      code === 1 && this.$toast.success(msg)
      code === -1 && this.$toast.error(msg)
    },
    chooseMusic(data) {
      this.queueMusicList = data.data
      this.messageInfo.push({ type: 'info', content: data.msg })
    },
    tips(data) {
      const { code, msg } = data
      code === 1 && this.$toast.success(msg)
      code < 0 && this.$toast.error(msg)
      code === -2 && setTimeout(() =>  this.$router.push('/'), 3000)
    },
    notice(notice) {
      this.messageInfo.push(notice)
    },
    recommendRoom(roomList){
      this.setRecommendRoomList(roomList)
    },
    disableJoin(data){
      const { msg } = data;
      this.$toast.error(msg)
      this.setRoomId(888)
    }
  },
  mounted() {
    this.initUserAddress()
    this.$nextTick(() => {
      document.addEventListener('keyup', this.keyboardEvent)
    })
  },
  beforeDestroy() {
    this.$socket.client.disconnect()
    document.removeEventListener('keyup', this.keyboardEvent, true)
  },
  methods: {
    ...mapMutations(['setRecommendRoomList','setRoomId']),
    ...mapActions(['changeUserInfo']),
    resetRoom(){
      this.messageInfo = [];
      this.messageParams = {page: 1, pagesize: 100  }
    },
    createOrJoinRoom(){
      if(!this.mineRoomId && !this.isCreate){
        this.isCreate = true
      }else if(!this.mineRoomId && this.isCreate){
        this.isCreate = false
      }else{
        if(this.roomId === this.mineRoomId) return this.$message.info("已经在当前房间了！")
        this.setRoomId(this.mineRoomId)
      }
    },
    async createRoomSuccess(){
      this.isCreate = false;
      const user = await this.$API.user.getInfo()
      this.changeUserInfo(user.userInfo)
      this.$toast.success("恭喜您、成功开通您的私人房间！")
    },
    /* 确认加入房间 */
    confirmJoin() {
      this.lock = false
      this.isShowBoard = true
      this.initSocket()
    },
    async queryRoomInfo(){
      const res = await this.$API.chat.roomInfo({roomId: this.roomId})
      this.roomInfo = res
    },
    updateLrc({ currentLrc, currentTime }) {
      this.currentLrc = currentLrc
      this.currentTime = currentTime
    },
    initUserAddress() {
      if (!document.querySelector('#address')) {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.id = 'address'
        script.src = 'https://pv.sohu.com/cityjson?ie=utf-8'
        document.head.appendChild(script)
      }
    },
    initSocket() {
      const token = this.$store.getters.token
      if (!token) {
        setTimeout(() => this.initSocket(), 50)
        this.$store.dispatch('toggleSignInModal', true)
      } else if (!window.returnCitySN) {
        setTimeout(() => this.initSocket(), 50)
      } else {
        const { cname } = window.returnCitySN
        this.$socket.client.io.opts.query = { token, address: cname, roomId: this.roomId }
        this.$socket.client.open()
        Vue.prototype.$socket = this.$socket
      }
    },
    /* 添加表情 */
    handleEmotion(emoji) {
      this.message += `[${emoji.text}]`
    },
    sendMsg(e) {
      if (this.$socket.client.disconnected) {
        e.preventDefault()
        this.message = ''
        this.loginAgain()
        return this.$toast.error('您已断开连接，请刷新页面重新连接！')
      }
      if (!this.$store.getters.userInfo) {
        this.loginAgain()
      }
      if (e.keyCode === 13 && this.message) {
        const data = { type: 'message', content: this.message }
        this.$socket.client.emit('message', data)
        this.$refs.messageFrame.toEnd()
        // this.$refs.messageInput.blur()
        this.message = ''
        e.preventDefault()
      }
    },
    focus() {
      this.$refs.messageInput.focus()
    },
    /* 权限校验失败，重新登录 */
    loginAgain(data) {
      data && this.$toast.error(data.msg)
      this.$store.dispatch('toggleSignUpModal', false)
      this.$store.dispatch('toggleSignInModal', true)
    },
    openBox(val) {
      if(this[`options${val}`].show) return this[`options${val}`].show= false
      this.closeBox()
      this[`options${val}`].show = !this[`options${val}`].show
    },
    openGit() {
      window.open('https://github.com/longyanjiang/Nine-chat-frontend','_blank');
    },
    closeBox() {
      const self = this
      const res = Object.keys(self._data).filter(
        (key) => key.search('option') !== -1
      )
      res.forEach((t) => (self[t].show = false))
    },
    async queryHistoryMessage() {
      const res = await this.$API.chat.history({...this.messageParams,...{roomId: this.roomId}})
      const reverseMessage = res.reverse().map( t => {
        if(Number(t.status) === -1){
          t.content = `${t.userInfo.nickname} 撤回了一条消息`
          t.type = 'info'
        }
        return t
      })
      this.messageInfo = [...reverseMessage, ...this.messageInfo]
    },
    collectMusic(data) {
      const userId = this.$store.getters.userInfo.userId
      data.userId = userId
      this.$socket.client.emit('collectMusic', { data })
    },
    chooseMusic(val) {
      this.$socket.client.emit('chooseMusic', val)
    },
    cutMusic() {
      this.$socket.client.emit('cutMusic')
    },
    sendEmoji(content) {
      const data = { type: 'img', content }
      this.$socket.client.emit('message', data)
      this.$refs.messageFrame.toEnd()
    },
    /* 上滑到顶部，加载更多历史消息 */
    loadMoreMessage() {
      if (this.messageParams.page > 30) return // 目前消息太多了可能会卡，最多给200条左右历史消息
      this.messageParams.page += 1
      this.queryHistoryMessage()
    },
    keyboardEvent(e) {
      if (e.keyCode === 117) { // f6
        this.$refs.bg.changeBg()
      }
      if(this.lock) return;
      if (e.keyCode === 192) {
        this.isShowCustomBg = !this.isShowCustomBg
      }
      if (e.keyCode === 27) {
        this.isShowBoard = !this.isShowBoard
      }
      if (e.keyCode === 112) { // f1
        this.$refs.toolbar.openBox(1)
      }
      if (e.keyCode === 113) { // f2
        this.$refs.toolbar.openBox(2)
      }
      if (e.keyCode === 114) { // f3
        this.$refs.toolbar.openBox(3)
      }
      if (e.keyCode === 115) { // f4
        this.$refs.toolbar.openBox(4)
      }
      if (e.keyCode === 116) { // f5
        this.isShowCustomBg = !this.isShowCustomBg
      }

      if (e.keyCode === 118) { // f7
      }
      if (e.keyCode === 119) { // f8
        this.openBox(1)
      }
      if (e.keyCode === 120) { // f9
        this.openBox(2)
      }
      if (e.keyCode === 121) { // f10
        this.openBox(3)
      }
    },
    newMsg(val) {
      this.unReadMsg = val
    },
    /* 粘贴发送图片文字 */
    pasting(e) {
      if(e.clipboardData.files.length){
        const file = e.clipboardData.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = ((e) => {
          this.$refs.preview.open(e.target.result, file )
        })
      }
    },
    /* 发送粘贴的图片 */
    async sendImage(file){
      const formData = new FormData()
      formData.append('file', file)
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      const res = await axios.post(Config.uploadURL, formData, config)
      const data = { type: 'img', content: res.data.data[0].url}
      this.$socket.client.emit('message', data)
    },
    removeQueueMusic(val) {
      this.$socket.client.emit('removeQueueMusic', val)
    },
    updateUserInfo() {
      this.$socket.client.emit('updateUserInfo')
    },
    copy () {
      const clipboard = new Clipboard('.room-share')
      clipboard.on('success', e => {
        this.$toast.success("复制成功、快发给你的小伙伴一起来听音乐吧~")
        process.browser && clipboard.destroy()
      })
    },
    quoteMessage(nickname){
      this.message = `@${nickname} `
      this.focus()
    },
    recallMessafe({id,nickname}){
      this.$socket.client.emit("recallMessafe", {id,nickname})
    }
  }
}
</script>

<style lang="less" scoped>
.chat {
  height: 100vh;
  width: 100vw;
  // background: url('https://pic.downk.cc/item/5fc744d6394ac5237897a1f4.jpg');
  z-index: 30;
  background: transparent;
  background-size: 100% 100% !important;
  transition: all .5s;
  @media screen and (max-width: 480px) {
    .chat-container {
      width: 100vw !important;
      height: 100vh !important;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      border-radius: 0;
    }
  }
  @media screen and (max-width: 720px) {
    .unread {
      top: -60px !important;
    }
  }
  &-container {
    position: fixed;
    left: 8%;
    right: 8%;
    top: 8%;
    bottom: 8%;
    transition: all 0.5s;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 20px #f1f1f1;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    z-index: 1;
    &-header {
      width: 100%;
      height: 50px;
      padding: 0 15px;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      .header-left {
        display: flex;
        align-items: center;
        .room-id {
          user-select: none;
          background-color: #333;
          color: #fff;
          padding: 0 5px;
          font-size: 14px;
          border-radius: 3px;
          margin-right: 5px;
        }
        .room-name {
          font-size: 18px;
          user-select: none;
        }
        .room-share{
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 5px;
          font-size: 13px;
          border-radius: 5px;
          cursor: pointer;
          margin-left: 10px;
          font-weight: 400;
          .icon{
            margin-right: 3px;
          }
          &:hover{
            background: #eee;
          }
        }
      }
      .header-center {
        flex: 1;
        display: flex;
        align-items: center;
      }
      .header-right {
        display: flex;
        align-items: center;
        .item {
          padding: 5px 10px;
          font-size: 13px;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #999;
          position: relative;
          .icon {
            font-size: 14px;
            margin-right: 3px;
          }
          &:hover {
            background-color: #eee;
          }
        }
      }
    }
    &-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 0;
      &-history {
        flex: 1;
        height: 0;
        // overflow: hidden;
        // overflow-y: auto;
        padding: 20px;
        position: relative;
      }
      &-footer {
        display: flex;
        flex-direction: column;
        border-top: 1px solid #eee;
        position: relative;
        .unread {
          transition: all 0.3s;
          position: absolute;
          right: 15px;
          top: -40px;
          padding: 7px 13px;
          font-size: 12px;
          background: #f56c6c;
          color: #fff;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          /* stylelint-disable */
          font-family: 'webfont';
        }
        .tool {
          position: relative;
        }
        .message {
          padding: 0 10px 10px 18px;

          &-input {
            width: 100%;
            overflow: hidden;
            position: relative;
            height: 50px;
            resize: none;
            outline: none;
            border: none;
            font-size: 13px;
            background-color: transparent;
          }
        }
      }
    }
  }
}

.chat-board{
  padding: 50px;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-end ;
  font-size: 2em;
  color: rgb(206, 201, 201);
  font-family: "webfont";
}

.create-room{
  cursor: pointer;
  padding: 4px 6px;
  display: flex;
  align-items: center;
  user-select: none;
  .icon{
    margin-right: 3px;
  }
  &:active{
    background: #eee;
  }
}
</style>
