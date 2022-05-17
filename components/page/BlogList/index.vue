<template>
  <div class="blog-list">
    <div class="blog-head">
      <div class="blog-head-title">
          <router-link
            :to="{ path: `/article/detail/${article.id}` }"
            class="router-title"
          >
            {{ article.title }}
            <Icon v-if="article.orderId > 5000" icon="article-topping" title="标签" :size="35"></Icon>
          </router-link>
        <div class="blog-head-title-info">
          <div class="blog-head-title-info-item">
            <span class="label">作者：</span>
            <router-link
              :to="{ path: `/article/search/?author=${article.userId}` }"
              class="link"
            >
              {{ article.nickname }}
            </router-link>
          </div>
          <div class="blog-head-title-info-item">
            <span class="label">分类：</span>
            <router-link
              :to="{ path: `/article/search/?typeId=${article.typeId}` }"
              class="link"
            >
              {{ article.typeName }}
            </router-link>
          </div>
        </div>
      </div>
      <div class="blog-head-time">
        <div class="blog-head-time-day"> {{ article.createdAt | dateFormatFilter('DD') }} </div>
        <div class="blog-head-time-date">
          <div class="blog-head-time-date-month"> {{ article.createdAt | dateFormatFilter('MM') }}月 </div>
          <div class="blog-head-time-date-year"> {{ article.createdAt | dateFormatFilter('YYYY') }} </div>
        </div>
      </div>
    </div>
    <div class="blog-body clearfix">
      <div class="blog-body-left">
        <router-link
          v-if="article.layoutMode !== 2"
          :to="{ path: `/article/detail/${article.id}` }"
          class=" article-link no-img-placeholder-colorful no-img-placeholder-horizon"
        >
          <img :src="article.coverImg" :alt="article.title" class="article-img" />
        </router-link>
      </div>
      <md-preview :content="firstParagraph" :padding="0" />
    </div>
    <div class="blog-footer">
      <div class="info-tags">
        <Icon icon="tag" title="标签" :size="20"></Icon>
        <router-link v-for="(item, index) in article.tagArr" :key="index" :to="{ path: `/article/search/?tagId=${item.id}` }" class="tags-link">
          {{ item.name }}
        </router-link>
      </div>
      <div class="blog-count">
        <!-- music -->
        <div v-if="article.bgMusic"  class="count-item" @click="playOrPauseMusic(article.id)">
          <Icon :icon="icon" title="播放" :size="18" class="music-btn"></Icon>
        </div>
        <div class="blog-count-content flex">
          <span class="flex_center">
            <Icon icon="blog-read-volume" title="阅读量" :size="16" class="count-item"></Icon>  {{article.readVolume || 0}}
          </span>
          <span class="flex_center">
            <Icon icon="blog-collect-volume" title="收藏量" :size="16" class="count-item"></Icon>  {{article.collectionVolume || 0}}
          </span>
        </div>
        <audio :ref="article.id" :src="article.bgMusic" ></audio>
      </div>
    </div>
  </div>
</template>

<script>
import MdPreview from '@/components/base/MdPreview/index'
import Icon from '@/components/base/Icon'
export default {
  components: {
    MdPreview,
    Icon
  },
  props: {
    article: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isPlay: false,
      notBannerType: ['语录','正能量','励志','个人收藏','语录收藏']
    }
  },
  computed: {
    firstParagraph() {
      const str = this.article.desc
        .replace(/```([\s\S]*?)```[\s]*/g, '') // 全局匹配代码块
        .replace(/!\[[\s\S]*?\]\([\s\S]*?\)/g, '') // 全局匹配图片
        .replace(/(#+)(.*)/g, ''); // 全局匹配标题
      let index = str.indexOf('\n', 300)
      if (index === -1) {
        index = str.indexOf('\n', 0)
      }
      return str.slice(0, index) + '\n ......'
    },
    icon(){
      return this.isPlay ? 'article-pause' : "article-play";
    },
    domId(){
      return this.article.id
    }
  },
  watch: {},
  created() {},
  methods: {
    playOrPauseMusic(id){
      this.isPlay && this.$refs[id].pause()
      !this.isPlay && this.$refs[id].play()
      this.isPlay = !this.isPlay
      this.$refs[id].addEventListener('ended', this.musicEnd)
    },
    musicEnd(){
      this.$refs[this.domId].paused && (this.isPlay = false)
      this.$refs[this.domId].removeEventListener('ended', this.musicEnd)
    }
  },
}
</script>
<style lang="less" scoped>
.blog-list {
  background: #fff;
  padding: 20px;
  transition: border 0.3s ease;
  margin-bottom: 2px;
  .blog-head {
    position: relative;
    display: flex;
    align-content: center;
    justify-content: space-between;
    padding-bottom: 10px;
    border-bottom: 1px solid @colorBorderLight;
    &::after {
      content: '';
      height: 2px;
      bottom: -1px;
      position: absolute;
      left: 0;
      width: 0;
      background-color: @colorPrimary;
      background-image: @color;
      transition: width 0.3s;
    }
    &-title {
      display: flex;
      flex-direction: column;
      .router-title {
        font-size: 20px;
        font-weight: 500;
        line-height: 1.2;
        color: @colorTextTitle;
        margin-bottom: 10px;
        cursor: pointer;
        &:hover {
          color: @colorPrimary;
          @colorActive();
        }
      }

      &-info {
        display: flex;
        color: @colorTextSub;
        font-size: 13px;
        &-item {
          display: flex;
          align-items: center;
          margin-right: 20px;
          * {
            white-space: nowrap;
          }
          i {
            margin-right: 2px;
          }
          .link {
            vertical-align: middle;
            &:hover {
              color: @colorPrimary;
              @colorActive();
            }
            &:nth-last-child(1) {
              margin-left: 3px;
              padding-left: 4px;
              border-left: 1px solid @colorBorder;
            }
          }
        }
      }
    }
    &-time {
      position: relative;
      display: flex;
      color: @colorTextSub;
      &-day {
        font-size: 40px;
        color: @colorSuccess;
        line-height: 1;
        margin-right: 3px;
        @colorActive();
      }
      &-date {
        display: flex;
        flex-direction: column;
        &-month {
          font-size: 15px;
          text-transform: uppercase;
          word-break: keep-all;
        }
        &-year {
          line-height: 1.1;
          font-size: 14px;
        }
      }
    }
  }
  &:hover {
    .blog-head {
      &::after {
        width: 100%;
      }
    }
  }
  .blog-body {
    margin: 12px 0;
    &-left {
      float: left;
      width: 315px;
      padding-right: 15px;
      overflow: hidden;
      background-color: @colorBg;
      .article-link {
        display: block;
        position: relative;
        padding-top: 60%;
      }
      .article-img {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
      }
    }
    @media screen and (max-width: @breakpoints-sm) {
      .blog-body-left {
        width: 100%;
        height: auto;
        float: none;
        padding-right: 0;
        margin-bottom: 10px;
      }
    }
  }
  .blog-footer{
    display: flex;
    justify-content: space-between;
    .info-tags {
      font-size: 13px;
      display: flex;
      align-items: center;
      color: @colorTextSub;
      .tags-link {
        margin-left: 10px;
        &:hover {
          color: @colorPrimary;
          @colorActive();
        }
      }
    }
    .blog-count {
      display: flex;
      align-items: center;
      color: @colorTextSub;
      .count-item {
        margin-left: 20px;
        margin-right: 5px;
        display: flex;
        align-items: center;
        .number {
          line-height: 20px;
          margin-left: 5px;
        }
        .music-btn{
          transition: all .3s;
          cursor: pointer;
          &:hover{
            transform: scale(1.1);
          }
        }
      }
    }
  }
}
</style>
