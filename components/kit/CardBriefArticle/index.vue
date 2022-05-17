<template>
  <card padding="0">
    <div class="card-brief-blog-wrap">
      <div
        :style="{
          'background-image': article.coverImg
            ? 'url(' + article.coverImg + ')'
            : ''
        }"
        class="brief-poster"
      ></div>
      <div class="author-avatar">
        <div
          :style="{ 'background-image': 'url(' + avatarUrl + ')' }"
          class="author-avatar-box"
        ></div>
      </div>
      <h3 class="brief-title">{{ article.title }}</h3>
      <p class="brief-title-sub">
        {{ article.createdAt | dateFormatFilter('YYYY 年 MM 月 DD 日') }}
      </p>
      <div class="brief-interaction">
        <div class="brief-interaction-item">
          <span>{{ article.collectionVolume || 0 }}</span>
          <p>Like</p>
        </div>
        <div class="brief-interaction-item">
          <span>{{ article.downloadVolume || 0 }}</span>
          <p>Download</p>
        </div>
        <div class="brief-interaction-item">
          <span>{{ article.readVolume || 0 }}</span>
          <p>Viewed</p>
        </div>
      </div>
    </div>
  </card>
</template>

<script>
import Card from '@/components/base/Card'
import defaultAvatar from '@/assets/images/no-data-bg-colorful.png'

export default {
  name: 'CardBriefBlog',
  components: {
    Card
  },
  props: {
    article: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    avatarUrl() {
      return this.article.avatar || defaultAvatar
    }
  }
}
</script>

<style lang="less" scoped>
.card-brief-blog-wrap {
  text-align: center;
  .brief-poster {
    padding-top: 61.8%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-color: @colorTextDisable;
  }
  .author-avatar {
    position: relative;
    padding-top: 38.2%;
    width: 38.2%;
    margin: -19% auto 0;
    border-radius: 100%;
    border: 5px solid @colorBorderLight;
    box-sizing: content-box;
  }
  .author-avatar-box {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border-radius: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .brief-title {
    margin-top: 15px;
    color: @colorTextTitle;
    font-weight: normal;
  }
  .brief-title-sub {
    margin-top: 5px;
    color: @colorTextSub;
  }
  .brief-interaction {
    display: flex;
    margin-top: 20px;
  }
  .brief-interaction-item {
    flex: 1;
    padding-bottom: 20px;
    span {
      font-size: 20px;
      color: @colorTextTitle;
    }
    p {
      color: @colorTextSub;
    }
  }
}
</style>
