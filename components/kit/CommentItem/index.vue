<template>
  <div>
    <ul class="comments-list">
      <li v-for="(comments,index) in commentsList" :key="comments.id" class="comments-list-item">
        <div class="comments-body">
          <div class="comments-user no-img-placeholder-colorful no-img-placeholder-horizon">
            <img v-if="comments.avatar" :src="comments.avatar" class="comments-user-avatar" alt="用户头像" />
          </div>
          <div class="comments-main">
            <div class="comments-mate">
              <span class="comments-mate-username">{{ comments.nickname || '未知' }}</span>
              <span v-if="comments.role === 'admin'" class="comments-mate-admin">站长</span>
              <span v-if="comments.role === 'super'" class="comments-mate-super">小助手</span>
              <span class="comments-mate-time">{{ comments.createdAt | dateFormatFilter('YYYY-MM-DD HH:mm:ss') }}</span>
              <span v-if="upId && upId === comments.id" class="comments-mate-unrepay" @click="handleUnRepay(comments)">取消回复</span>
              <span v-else class="comments-mate-repay" @click="handleRepay(comments)">回复</span>
              <div class="comments-mate-order">#{{ index + 1 }}</div>
            </div>
            <div class="comments-content" v-html="replaceEmotionText(comments.comment)"></div>
            <div class="comments-address"><Icon  class="m_r2" icon='address' :size='20' />{{ comments.address ? comments.address : '可能在火星' }}</div>
            <ul v-if="comments.chlidComment && comments.chlidComment.length > 0" class="repay-list">
              <li v-for="repay in comments.chlidComment" :key="repay.id" class="repay-list-item">
                <div class="comments-body">
                  <div class="comments-user no-img-placeholder-colorful no-img-placeholder-horizon">
                    <img v-if="repay.avatar" :src="repay.avatar || ''" class="comments-user-avatar" alt="用户头像" />
                  </div>
                  <div class="comments-main">
                    <div class="comments-mate">
                      <span class="comments-mate-username">{{ repay.nickname || '未知' }}</span>
                      <span v-if="repay.role === 'admin'" class="comments-mate-admin">站长</span>
                      <span v-if="comments.role === 'super'" class="comments-mate-super">小助手</span>
                      <span class="comments-mate-time">{{ repay.createdAt | dateFormatFilter('YYYY-MM-DD HH:mm:ss') }}</span>
                    </div>
                    <div class="comments-content" v-html="replaceEmotionText(repay.comment)"></div>
                    <div class="comments-address">
                      <Icon icon='address' class="m_r2" :size='20' />
                      {{ repay.address ? repay.address : '可能在火星' }}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div v-if="upId && upId === comments.id" style="margin-top: 20px;">
              <comment-box :up-id="upId" :type="type"  @on-success="handleCommentsSuccess" />
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { replaceEmotionText } from '@/components/base/Emotion/emotion.js'
import CommentBox from '@/components/kit/CommentBox'
import Icon from '@/components/base/Icon'
export default {
  name: 'CommentItem',
  components: {
    CommentBox, Icon
  },
  props: {
    type: {
      type: String,
      default: 'comment'
    },
    commentsList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      upId: '',
    }
  },
  methods: {
    replaceEmotionText,

    /* 回复消息 */
    handleRepay({id}) {
      this.upId = Number(id)
    },

    /* 取消回复 */
    handleUnRepay() {
      this.upId = ''
    },

    /* 评论成功 */
    handleCommentsSuccess() {
      this.upId = ''
      this.$emit('on-fresh')
    }
  }
}
</script>

<style lang="less" scoped>
.comments-list {
  position: relative;
  .comments-list-item {
    padding: 15px;
    border-top: 1px solid @colorBorderLight;
    border-bottom: 1px solid @colorBorderLight;
  }
  .comments-mate-repay {
    color: @colorError;
    cursor: pointer;
    display: none;
  }
  .comments-list-item:hover .comments-mate-repay {
    display: inline;
  }

  .repay-list {
    padding: 10px 10px 0;
  }
  .repay-list-item {
    padding: 5px;
    border-top: 1px dashed @colorBorder;
  }

  .comments-body {
    display: flex;
    align-items: flex-start;
  }
  .comments-user {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin-right: 15px;
  }
  .comments-user-avatar {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
  .comments-main {
    flex: 1;
  }

  .comments-content {
    margin: 10px 0;
    min-height: 60px;
    text-align: justify;
    line-height: 1.75;
    word-break: break-all;
  }
  .comments-mate {
    margin-bottom: 5px;
    vertical-align: middle;
    font-size: 12px;
  }

  .comments-mate-username {
    font-size: 16px;
    margin-right: 10px;
    color: @colorAssist;
    @colorActive();
  }
  .comments-mate-admin {
    display: inline-block;
    padding: 0 8px;
    font-weight: 500;
    background: @color;
    color: #fff;
    margin-right: 10px;
    border-radius: 4px;
  }

  .comments-mate-super{
    display: inline-block;
    padding: 0 8px;
    background: #000;
    color: #fff;
    margin-right: 10px;
    border-radius: 4px;
  }

  .comments-mate-time {
    color: @colorTextLight;
    margin-right: 10px;
  }

  .comments-mate-unrepay {
    color: @colorError;
    cursor: pointer;
  }
  .comments-mate-order {
    font-weight: bold;
    float: right;
    font-size: 16px;
    color: @colorAssist;
    @colorActive();
  }
  .comments-address {
    display: flex;
    align-items: center;
    color: @colorTextLight;
    font-size: 13px;
    i {
      margin-right: 5px;
      font-size: 18px;
    }
  }
}
</style>
