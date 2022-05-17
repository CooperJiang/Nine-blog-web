<template>
  <div class="s-container">
    <div class="s-row">
      <div class="s-col-lg-42 s-col-xl-45">
        <card padding="0">
          <bill-board
            :poster="article.coverImg"
            :title="article.title"
            :title-sub="
              article.createdAt | dateFormatFilter('YYYY 年 MM 月 DD 日')
            "
          >
            <div class="tags">
              <tag
                v-for="(tag, index) in article.tagArray"
                :key="index"
                size="large"
                theme="gradient"
                shape="rect"
                >{{ tag.name }}</tag
              >
              <btn
                v-if="isLiked"
                :loading="isLikeLoading"
                shape="rect"
                theme="gradient"
                icon="like"
                @click="collectArticle(0)"
              ></btn>
              <btn
                v-if="!isLiked"
                :loading="isLikeLoading"
                shape="rect"
                theme="gradient"
                icon="unLike"
                @click="collectArticle(1)"
              ></btn>
            </div>
          </bill-board>
        </card>

        <mine-player
          v-if="article.bgMusic"
          class="m_t10 m_b10"
          :src="article.bgMusic"
          :autoplay="article.autoPlay === 1"
        />

        <card padding="20px" style="margin-bottom: 20px">
          <md-preview :content="article.content" :is-bg-show="true" />
        </card>

        <card class="message-form" style="margin-bottom: 20px">
          <title-bar :bottom="20" title="交流专区 文明发言"></title-bar>
          <comment-box
            type="message"
            :article-id="articleId"
            @on-success="handleCommentsSuccess"
          />
        </card>

        <div>
          <card
            v-if="commentsList.length"
            padding="20px"
            style="margin-bottom: 20px"
          >
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
          <card-empty v-else style="height: 300px; margin-bottom: 20px" />
        </div>
      </div>
      <div class="s-col-lg-18 s-col-xl-15 visible-lg visible-xl">
        <div id="infoCard" style="margin-bottom: 20px">
          <card-brief-article
            v-if="article && article.content"
            :article="article"
          />
          <card-empty v-else style="height: 385px" />
        </div>
        <!-- 侧边栏目录 -->
        <div v-if="article.layoutMode === 1" id="titleList">
          <article-nav :content="article.content" />
        </div>
        <!-- 热门文章 -->
        <div  v-if="article.layoutMode === 2" id="hotArticle" >
          <card :padding="0" title="热门文章" class="hidden-xs hidden-sm">
            <ul v-if="hotArticle.length > 0" class="card-rank-list">
              <li
                v-for="(blog, index) in hotArticle"
                :key="index"
                class="rank-item"
              >
                <router-link
                  :to="{ path: `/article/detail/${blog.id}` }"
                  active-class="current"
                  class="rank-item-link"
                >
                  <div class="rank-item-title">{{ blog.title }}</div>
                  <div class="rank-item-number">
                    <icon
                      class="svg-icon"
                      icon="eye"
                      title="浏览"
                      :size="16"
                    ></icon>
                    <span class="number">{{ blog.readVolume }}</span>
                  </div>
                </router-link>
              </li>
            </ul>
            <card-empty v-else style="height: 260px" />
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommentItem from '@/components/kit/CommentItem/index.vue'
import Pagenation from '@/components/base/Pagenation'
import TitleBar from '@/components/kit/TitleBar'
import CommentBox from '@/components/kit/CommentBox'
import Card from '@/components/base/Card'
import MdPreview from '@/components/base/MdPreview'
import ArticleNav from '@/components/page/ArticleNav'
import BillBoard from '@/components/kit/BillBoard'
import Btn from '@/components/base/Btn'
import Tag from '@/components/base/Tag'
import { throttle } from '@/assets/js/tools'
import CardBriefArticle from '@/components/kit/CardBriefArticle'
import CardEmpty from '@/components/kit/CardEmpty'
import MinePlayer from '@/components/kit/MinePlayer'
import Icon from '@/components/base/Icon'

export default {
  components: {
    Card,
    MdPreview,
    ArticleNav,
    BillBoard,
    Btn,
    Tag,
    CardBriefArticle,
    CardEmpty,
    CommentItem,
    Pagenation,
    TitleBar,
    CommentBox,
    MinePlayer,
    Icon
  },
  async asyncData({ app, params }) {
    const { articleId } = params
    const param = { id: articleId }
    const article = await app.$API.article.detail(param)
    return { article, articleId: Number(articleId), isLiked: article.isLiked }
  },
  data() {
    return {
      article: {},
      isLikeLoading: false,
      commentsList: [],
      total: 0,
      articleId: null,
      hotArticle: [],
      params: {
        page: 1,
        pageSize: 10,
      },
      isLiked: false,
    }
  },
  head() {
    return {
      title: `${this.article.title} - 小九的博客`,
      meta: [
        {
          hid: 'article-detail-index',
          name: 'articleDetailIndex',
          content: 'My blog article detail page',
        },
      ],
    }
  },
  created() {
    /* 没有侧边栏目录的时候才会去显示热门列表 */
    this.article.layoutMode === 2 && this.queryHotArticle()
    this.requestCommentsList()
  },
  mounted() {
    const vm = this
    this.throttleScroll = throttle(function () {
      vm.scrollHandler()
    }, 20)
    window.addEventListener('scroll', this.throttleScroll)
    document.documentElement.scrollTop = document.documentElement.scrollTop + 1
    this.recordReadVolume()
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.throttleScroll)
  },
  methods: {
    async queryHotArticle(){
      const res = await this.$API.article.hot()
      this.hotArticle = res

    },
    scrollHandler() {
      const t = document.documentElement.scrollTop || document.body.scrollTop
      /* layoutMode === 1的情况下显示文章目录列表  === 2 显示热门文章  */
      let otherDom;
      this.article.layoutMode === 1 && (otherDom = document.getElementById('titleList'))
      this.article.layoutMode === 2 && (otherDom = document.getElementById('hotArticle'))
      const infoCard = document.getElementById('infoCard')

      if (t >= infoCard.clientHeight + 20) {
        otherDom.classList.add('fixed-side-card')
      } else {
        otherDom.classList.remove('fixed-side-card')
      }
    },

    handleCommentsSuccess() {
      this.$toast.success('评论成功...')
      this.requestCommentsList()
    },

    async requestCommentsList() {
      const params = this.params
      this.articleId && (params.articleId = this.articleId)
      const { rows, count } = await this.$API.comment.query(params)
      this.commentsList = rows
      this.total = count
    },

    changePage(val) {
      this.params.page = val
      this.requestCommentsList()
    },

    recordReadVolume() {
      this.$API.article.read({ id: this.articleId })
    },

    async collectArticle(isLike) {
      this.isLikeLoading = true
      try {
        await this.$API.collect.set({
          articleId: this.articleId,
          typeId: 2,
          isLike,
        })
        isLike &&
          this.$toast.success(`收藏成功、收藏文章后续会在个人中心开放！`)
        !isLike && this.$toast.success(`已取消收藏`)
        this.isLikeLoading = false
        this.isLiked = isLike === 1
      } catch (error) {
        this.isLikeLoading = false
      }
    },
  },
}
</script>

<style lang="less" scoped>
.fixed-side-card {
  position: fixed;
  top: @heightHeader + 20;
  width: 100%;
  @media screen and (min-width: @breakpoints-xs) {
    // min-width: 320px;
  }

  @media screen and (min-width: @breakpoints-sm) {
    max-width: @containerMaxWidth-sm * 7 / 24 - 16;
  }

  @media screen and (min-width: @breakpoints-md) {
    max-width: @containerMaxWidth-md * 7 / 24 - 16;
  }

  @media screen and (min-width: @breakpoints-lg) {
    max-width: @containerMaxWidth-lg * 7 / 24 - 16;
  }

  @media screen and (min-width: @breakpoints-xl) {
    max-width: @containerMaxWidth-xl * 6 / 24 - 16;
  }
}

.card-rank-list {
  position: relative;
  .rank-item {
    padding: 0 15px;
    z-index: 1;
  }

  .rank-item-link {
    display: flex;
    justify-content: space-between;
    padding-left: 15px;
    height: 40px;
    color: @colorTextSub;
    line-height: 40px;
    text-decoration: none;
    border-bottom: 1px solid lighten(@colorBorderLight, 2%);
    .rank-item-title {
      margin-right: 30px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .rank-item-number {
      flex: none;
      .svg-icon {
        color: #808695 !important;
      }
    }
  }

  .rank-item-link:hover {
    color: @colorTextTitle;
    .svg-icon {
      color: @colorTextTitle !important;
    }
  }

  .current {
    color: @colorTextTitle;
  }
}
</style>
