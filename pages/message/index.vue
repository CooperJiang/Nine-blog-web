<template>
  <div class="app-message">
    <bill-board
      :poster="banneImg"
      title="留言板"
      title-sub="有空一起吹吹水啊！"
      is-page
      poster-blue="0"
      height="350px"
    >
    </bill-board>
    <div class="s-container cont-list">
      <card class="message-form">
        <comment-box type="message" @on-success="handleCommentsSuccess" />
      </card>
      <div class="message-list">
        <card
          v-if="commentsList && commentsList.length > 0"
          v-loading="isCommentsListLoading"
        >
          <title-bar :bottom="0" title="留言"></title-bar>
          <comment-item
            :comments-list="commentsList"
            type="message"
            @on-fresh="requestCommentsList"
          />
          <pagenation
            hide-on-single-page
            :current-page="params.page"
            :page-size="params.pageSize"
            :total="total"
            class="m_t20"
            @pageChange="changePage"
          />
        </card>
        <card-empty v-else style="height: 300px" />
      </div>
    </div>
  </div>
</template>

<script>
import CommentItem from '@/components/kit/CommentItem/index.vue'
import BillBoard from '@/components/kit/BillBoard'
import TitleBar from '@/components/kit/TitleBar'
import Card from '@/components/base/Card'
import CardEmpty from '@/components/kit/CardEmpty'
import CommentBox from '@/components/kit/CommentBox'
import Pagenation from '@/components/base/Pagenation'
const banneImg = require('@/assets/images/home/banner_message.gif')
export default {
  components: {
    BillBoard,
    Card,
    CardEmpty,
    TitleBar,
    CommentBox,
    CommentItem,
    Pagenation
  },
  data() {
    return {
      banneImg,
      commentsList: [],
      total: 0,
      params: {
        page: 1,
        pageSize: 10
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.requestCommentsList()
  },
  methods: {
    handleCommentsSuccess() {
      // this.$toast.success('发布成功，将在审核后展示...')
      this.$toast.success('发布成功...')
      this.requestCommentsList()
    },

    async requestCommentsList() {
      this.isCommentsListLoading = true
      const { rows, count } = await this.$API.comment.query(this.params)
      this.isCommentsListLoading = false
      this.commentsList = rows
      this.total = count
    },

    changePage(val) {
      this.params.page = val
      this.requestCommentsList()
    }
  }
}
</script>

<style lang="less">
.app-message {
  margin-top: -@heightHeader - 20;
  .cont-list {
    margin-top: 20px;
    .message-list {
      margin-top: 20px;
    }
  }
}
</style>
