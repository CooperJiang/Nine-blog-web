<template>
  <div class="comments-from">
    <div class="comments-form-body">
      <div class="comments-form-user">
        <div class="comments-form-user-avatar no-img-placeholder-colorful no-img-placeholder-horizon">
          <img v-if="userInfo&&userInfo.avatar" :src="userInfo.avatar" alt="用户头像" />
        </div>
        <span v-if="userInfo" class="comments-form-user-name">{{ userInfo.nickname }}</span>
        <btn v-else theme="text" style="width: 60px;padding:4px 0;" @click="handleLogin">加入我们</btn>
      </div>
      <div class="comments-form-content">
        <div class="comments-form-content-input">
          <textarea v-model="formData.comment" placeholder="愣着干嘛、不如一吐为快吧..." rows="5"></textarea>
        </div>
      </div>
    </div>
    <div class="comments-form-footer">
      <div class="comments-form-footer-btns">
        <button class="mo-btns"  @blur="handleBlur" >
          <Icon icon='emotion' class="svg_icon" @click.native="handleClick" />
          <Emotion v-show="showDialog" class="emoji-picker" @emotion="handleEmotion" />
        </button>
        <span>{{ formData.comment ? formData.comment.length : 0 }} / 500</span>
      </div>
      <btn :loading="isAddCommentLoading" theme="gradient" shape="rect" @click="handleComment">{{ upId ? '回复' : '发布' }}</btn>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Btn from '@/components/base/Btn'
import Icon from "@/components/base/Icon"
import Emotion from '@/components/base/Emotion/Emotion.vue'

export default {
  name: 'CommentBox',
  components: {
    Btn,Icon,Emotion
  },
  props: {
    type: {
      type: String,
      default: 'comment'
    },
    upId: {
      type: [String,Number],
      default: ''
    },
    articleId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      showDialog: false,
      isAddCommentLoading: false,
      formData: {
        comment: ''
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted() {
    if (!document.querySelector('#address')) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.id = 'address'
      script.src = 'https://pv.sohu.com/cityjson?ie=utf-8'
      document.head.appendChild(script)
    }
  },
  methods: {
    ...mapActions({
      toggleSignInModal: 'toggleSignInModal'
    }),

    /* 添加表情 */
    handleEmotion(emoji) {
      this.formData.comment += `[${emoji.text}]`
    },

    /* 打开表情窗口 */
    handleClick() {
      this.showDialog = !this.showDialog
    },

    /* blur关闭表情窗口 */
    handleBlur() {
      this.showDialog = false
    },

    /* 评论前要求登录 */
    handleLogin() {
      this.toggleSignInModal(true)
    },

    /* 评论 */
    handleComment() {
      if(!this.userInfo) return this.toggleSignInModal(true)
      this.requestMessages()
    },

    /* 留言与评论 */
    async requestMessages() {
      if (!this.formData.comment.trim()) return this.$toast.error('请输入评论内容')
      const params = { comment: this.formData.comment, ip: window.returnCitySN.cip, address: window.returnCitySN.cname }
      this.upId && (params.upId = this.upId)
      this.articleId && (params.articleId = this.articleId)
      this.isAddCommentLoading = true
      try {
        await this.$API.comment.set(params)
        this.formData.comment = ''
        this.$emit('on-success')
        this.isAddCommentLoading = false
      } catch (error) {
        this.isAddCommentLoading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.comments-form {
  &-body {
    display: flex;
    align-items: flex-start;
  }
  &-user {
    flex: none;
    text-align: center;
    margin-right: 15px;
    &-avatar {
      height: 50px;
      width: 50px;
      border-radius: 50%;
      margin: 0 auto;
      img {
        height: 100%;
        width: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    &-name {
      margin-top: 4px;
      display: block;
      width: 60px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  &-content {
    position: relative;
    flex: 1;
    border: 1px solid @colorBorder;
    &-input {
      position: relative;
      display: block;
      width: 100%;
      height: auto;
      &::before {
        content: '';
        position: absolute;
        display: block;
        width: 14px;
        height: 14px;
        top: 14px;
        left: -8px;
        border: 1px solid @colorBorder;
        border-width: 0 0 1px 1px;
        background-color: #fff;
        transform: rotate(45deg);
      }
      textarea {
        all: unset;
        display: block;
        height: 100%;
        width: 100%;
        padding: 10px;
        word-break: break-word;
        box-sizing: border-box;
      }
    }

    &:focus-within {
      border: 1px solid @colorPrimary;
    }
    &:focus-within ::before {
      border: 1px solid @colorPrimary;
      border-width: 0 0 1px 1px;
    }
  }
  &-footer {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 75px;
    &-btns {
      z-index: 100;
      display: flex;
      align-items: center;
      color: #ccc;
      .mo-btns {
        padding: 0;
        position: relative;
        border: none;
        outline: none;
        background: none;
        margin-right: 20px;
        .svg_icon{
          color: #ccc;
        }
        i {
          font-size: 30px;
          color: #ccc;
        }
        &:hover {
          i {
            @colorActive();
          }
        }
      }
      .emoji-picker {
        position: absolute;
        top: 40px;
        left: 0;
      }
    }
  }
}
@media only screen and (max-width: @containerMaxWidth-sm) {
  .emoji-picker {
    left: -70px !important;
  }
}
</style>
