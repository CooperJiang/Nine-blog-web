<template>
  <div class="s-container">
    <div class="filter-bar">
      <filter-search
        v-model="formData.typeId"
        :options="filterTypeList"
        title="分类"
        icon="type"
        label-key="name"
        value-key="id"
        @on-change="changeParam"
      ></filter-search>
      <filter-search
        v-model="formData.tagId"
        :options="tagList"
        multiple
        title="标签"
        icon="tag"
        label-key="name"
        value-key="id"
        @on-change="changeParam"
      >
      </filter-search>
    </div>
    <div class="s-row blog-mobile">
      <div v-loading="isLoading" class="s-col-md-42 s-col-xl-45">
        <template v-if="blogList.length > 0">
          <blog-list
            v-for="(blog, index) in blogList"
            :key="index"
            :article="blog"
          ></blog-list>
        </template>
        <card-empty v-else style="height: 300px" />
        <pagenation
          :total="total"
          :current-page="page"
          :page-size="pageSize"
          style="margin-top: 20px"
          hide-on-single-page
          @pageChange="changePage"
        />
      </div>
      <div class="list-side s-col-md-18 s-col-xl-15">
        <card class="search-wrap">
          <search-article ref="searchInput" @on-search="handleSearch" />
        </card>
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
</template>

<script>
import { mapGetters } from 'vuex'
import FilterSearch from '@/components/kit/FilterSearch'
import Card from '@/components/base/Card'
import BlogList from '@/components/page/BlogList'
import SearchArticle from '@/components/kit/SearchArticle'
import Pagenation from '@/components/base/Pagenation'
import CardEmpty from '@/components/kit/CardEmpty'
import Icon from '@/components/base/Icon'

export default {
  name: 'BlogSearch',
  components: {
    FilterSearch,
    Card,
    BlogList,
    SearchArticle,
    Pagenation,
    CardEmpty,
    Icon
  },
  data() {
    return {
      formData: {
        typeId: null,
        tagId: null,
        keyword: null
      },
      page: 1,
      pageSize: 10,
      total: 0,
      blogList: [],
      hotArticle: [],
      isLoading: false
    }
  },
  head() {
    return {
      title: '搜索文章 - 小九的博客',
      meta: [
        {
          hid: 'article-search-index',
          name: 'articleSearchIndex',
          content: 'My blog article search page'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['tagList', 'typeList']),
    filterTypeList() {
      return this.typeList.filter((item) => item.value !== '/')
    }
  },
  async created() {
    !this.tagList.length && (await this.$store.dispatch('queryTagList'))
    !this.typeList.length && (await this.$store.dispatch('queryTypeList'))
    this.queryHotArticle()
  },
  mounted() {
    const { keyword, tagId, typeId } = this.$route.query
    keyword && (this.formData.keyword = keyword)
    typeId && (this.formData.typeId = [typeId])
    tagId && (this.formData.tagId = [tagId])
    this.queryArticle()
  },
  methods: {
    async queryArticle() {
      this.isLoading = true
      const { page, pageSize } = this
      const params = { page, pageSize, ...this.formData, status: 1 }
      try {
        const res = await this.$API.article.query(params)
        const { rows: blogList, count: total } = res
        Object.assign(this, { blogList, total })
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
      }
    },
    async queryHotArticle(){
      const res = await this.$API.article.hot()
      this.hotArticle = res
      console.log('res: ', res);
    },
    changeParam() {
      this.page = 1
      this.queryArticle()
    },
    async handleSearch(keyword) {
      this.page = 1
      this.formData.keyword = keyword
      await this.queryArticle()
      this.$refs.searchInput.clear()
      this.formData.keyword = null
    },
    changePage(page) {
      this.page = page
      this.queryArticle()
    }
  }
}
</script>

<style lang="less" scoped>
.filter-bar {
  position: relative;
  padding: 20px 20px 20px 22px;
  margin-bottom: 20px;
  background-color: #fff;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 2px;
    height: 100%;
    background: @colorCol;
  }
}
.list-side {
  position: sticky;
  top: @heightHeader + 20;
  z-index: 10;
}
.z-card.search-wrap {
  background-image: @color;
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
@media (min-width: @breakpoints-xs) and (max-width: @breakpoints-md) {
  .blog-mobile {
    display: flex;
    flex-direction: column-reverse;
    .list-side {
      position: relative;
      top: 0;
      margin-bottom: 20px;
    }
  }
}
</style>
