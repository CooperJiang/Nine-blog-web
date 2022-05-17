<template>
  <div  id="box" class="message-box">
    <div
      v-for="(item, index) in messageData"
      :key="index"
      :class="['message-box-item', messageClass(item)]"
    >

      <span
        v-if="['message', 'img'].includes(item.type)"
        class="message-box-item-info"
      >
     <el-dropdown  trigger="click" placement="bottom-start">
        <div class="info-box">
          <span :class="['name']">
            {{ item.userInfo && item.userInfo.nickname }}
          </span>
          <span
            v-if="item.type === 'message'"
            class="message"
            v-html="replaceEmotionText(item.content)"
          ></span>
          <span v-if="item.type === 'img'" class="emoji">
            <img :src="item.content" loading="lazy" @click.stop="previewImg(item)" />
          </span>
          <span class="time">{{formatChatTime(item.createdAt)}}</span>
        </div>
        <el-dropdown-menu v-if="item.userInfo" slot="dropdown">
          <el-dropdown-item v-if="item.userInfo.userId !== mineUserId" icon="el-icon-chat-dot-round" @click.native="quoteMessage(item)">引用消息</el-dropdown-item>
          <el-dropdown-item v-if="item.userInfo.userId === mineUserId" icon="el-icon-delete" @click.native="recallMessafe(item)">撤回消息</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
     <el-dropdown  v-if="item.userInfo"  trigger="click" :placement="item.userInfo.userId === mineUserId ? 'bottom-end' : 'bottom-start'">
        <img class="avatar" :src="item.userInfo.avatar" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-if="item.userInfo.userId !== mineUserId" icon="el-icon-chat-dot-round" @click.native="quoteMessage(item)">@Ta</el-dropdown-item>
          <el-dropdown-item icon="el-icon-delete" @click.native="readHomepage">查看主页</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      </span>



      <!-- info -->
      <span v-if="item.type === 'info'" class="msg"> {{ item.content }} </span>

      <!-- img emoji -->
      <!-- <span v-if="item.type === 'img'" class="emoji">
        <img :src="item.content">
      </span> -->

      <!-- notice -->
      <span v-if="item.type === 'notice'" class="notice-box">
        <div class="notice-box-header">
          <span class="title">房间公告</span>
        </div>
        <div v-for="(t, i) in item.content" :key="i">{{ t }}</div>
      </span>
    </div>
    <div ref="end" class="end"></div>
    <chat-preview ref="preImg" mode='preImg' :lock-modal="false" />
  </div>
</template>

<script>
import { replaceEmotionText } from '@/components/base/Emotion/emotion.js'
import { throttle } from '@/assets/js/tools'
import { formatChatTime } from '@/assets/js/utils'
import ChatPreview from '@/components/chat/ChatPreview/index.vue'

export default {
  name: 'MessageBox',
  components: {ChatPreview},
  props: {
    messageData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isVisible: true,
      unReadMsg: 0
    }
  },
  computed: {
    mineUserId() {
      return this.$store.getters.userInfo.userId
    },
    messageClass() {
      return (item) => {
        const { userId, type } = item
        if (['message', 'img'].includes(type)) {
          return userId === this.mineUserId ? 'mine' : 'other'
        }
        if (type === 'notice') {
          return 'notice'
        }
        if (type === 'info') {
          return 'info'
        }
      }
    }
  },
  watch: {
    messageData(n, o) {
      this.isVisible && this.toEnd()
      if (!this.isVisible) {
        this.unReadMsg += 1
        this.$emit('newMsg', this.unReadMsg)
      }
    }
  },
  mounted() {
    // this.init()
    document
      .querySelector(`#box`)
      .addEventListener('scroll', throttle(this.scrollToTop))
  },
  methods: {
    replaceEmotionText,
    formatChatTime,
    readHomepage(){
      this.$toast.info("这个需求得你来提呢qaq...")
    },
    quoteMessage(item){
      this.$emit('quoteMessage', item.userInfo.nickname)
    },
    recallMessafe(item){
      this.$emit("recallMessafe", {id:item.id,nickname:item.userInfo.nickname })
    },
    /* TODO 新增聊天不能呗监听到 */
    // isAdmin(item) {
    //   const userId = item.userInfo.id
    //   return userId === 1 ? 'admin' : ''
    // },
    /* 滚动到底部 */
    toEnd() {
      this.$nextTick(() => {
        this.$refs.end.scrollIntoView(true)
      })
    },
    /* 初始化等待请求到数据再滚动到底部 */
    init() {
      const timer = setInterval(() => {
        if (!this.messageData.length) {
          this.init()
        } else {
          this.toEnd()
          clearInterval(timer)
        }
      }, 50)
    },
    /**
     * @desc 监听窗口确定是否跳转到底部
     *       1. 初始化的时候init默认在消息底部
     *       2. 在视窗高度450内的时候有消息自动滑到底部
     *       3. 在视窗450以上说明去看历史消息了 这个时候不到底部 提示有新消息
     *       4. 在显示有新消息的时候 再次到底部新消息提示消失
     */
    scrollToTop() {
      const el = document.querySelector(`#box`)
      const scrollTop = el.scrollTop
      const scrollHeight = el.scrollHeight
      this.isVisible = el.offsetHeight + scrollTop - scrollHeight > -450
      /* 滑到顶部了加载更多消息 */
      const msgEl = document.querySelector(`.message-box-item`)
      // if(!scrollTop){
      //   this.$emit('loadMoreMessage')
      //   this.$nextTick(()=>{
      //     msgEl.scrollIntoView(true)
      //   })
      // }
      this.isVisible && (this.unReadMsg = 0)
      this.isVisible && this.$emit('newMsg', this.unReadMsg)
      !scrollTop && this.$emit('loadMoreMessage')
      // this.$nextTick(()=>{
      !scrollTop && msgEl.scrollIntoView(true)
      // })
      if (el.offsetHeight + scrollTop - scrollHeight === 0) {
        // console.log('到底了');
      }
    },
    previewImg({content}){
      this.$refs.preImg.open(content)
    }
  }
}
</script>
<style lang="less" scoped>
.message-box {
  height: 100%;
  // overflow: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  // position: relative;
  // &::-webkit-scrollbar {
  //   display: none;
  // }
  &-item {
    display: flex;
    align-items: flex-start;
    padding: 7px 0 ;
    flex-shrink: 0;
    &-info {
      display: flex;
      align-items: flex-start;
      height: 100%;
      .info-box {
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 0;
        .message {
          font-size: 13px;
          padding: 8px 16px;
          border-radius: 6px;
          margin-top: 10px;
          cursor: pointer;
          text-align: justify;
          line-height: 2;
          max-width: 300px;
        }
        .emoji {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 5px;
          img {
            max-width: 300px;
            border-radius: 5px;
            cursor: pointer;
          }
        }
        .time{
          font-size: 12px;
          color: #9f9898;
          margin-top: 5px;
        }
        .name {
          font-size: 14px;
          color: #3c3c3c;
        }
      }

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 6px;
      }
    }
  }
}
.mine {
  color: #000;
  justify-content: flex-end;
  .message-box-item-info {
    flex-direction: row;
    .info-box {
      align-items: flex-end;
      margin-right: 20px;
      .message {
        background-color: #a9e87a;
        color: #000;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          top: -5px;
          left: auto;
          right: -13px;
          width: 15px;
          height: 15px;
          border: 0 solid transparent;
          border-bottom-width: 12px;
          border-bottom-color: currentColor;
          border-radius: 0 0 15px 0;
          color: #a9e87a;
        }
      }
    }
  }
}
.other {
  justify-content: flex-start;
  .message-box-item-info {
    flex-direction: row-reverse;
    .info-box {
      align-items: flex-start;
      margin-left: 20px;
      .message {
        background-color: #eee;
        color: #000;
        position: relative;
        &::after {
          content: '';
          position: absolute;
          top: -5px;
          left: -13px;
          right: auto;
          width: 15px;
          height: 15px;
          border: 0 solid transparent;
          border-bottom-width: 12px;
          border-bottom-color: currentColor;
          border-radius: 0 0 0 15px;
          color: #eee;
        }
      }
    }
  }
}
.info {
  justify-content: center;
  .msg {
    font-size: 12px;
    color: #aaa;
    display: inline-block;
    background-color: #eee;
    padding: 2px 8px;
    border-radius: 3px;
    max-width: 500px;
  }
}
.notice {
  justify-content: center;
  &-box {
    text-align: left;
    max-width: 500px;
    background: #eee;
    padding: 10px 15px;
    border-radius: 10px;
    color: #999;
    font-size: 13px;
    display: flex;
    flex-direction: column;
    letter-spacing: 3px;
    &-header {
      display: flex;
      .title {
        font-size: 16px;
        color: #1295dd;
        display: inline-block;
        border-bottom: 2px dotted #1295dd;
        margin-bottom: 10px;
        padding-bottom: 5px;
      }
    }
  }
}

::-webkit-scrollbar {
  display: none;
}
</style>
