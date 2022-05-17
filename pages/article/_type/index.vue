<template>
  <div class="s-container">
    <div class="s-row blog-mobile">
      <div class="s-col-md-42 s-col-xl-45">
        <template v-if="blogList && blogList.length > 0">
          <blog-list
            v-for="item in blogList"
            :key="item.title"
            :article="item"
          />
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
          <search-article icon="search" @on-search="handleSearch" />
        </card>
        <side-bar />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BlogList from '@/components/page/BlogList'
import Card from '@/components/base/Card'
import CardEmpty from '@/components/kit/CardEmpty'
import SideBar from '@/components/page/SideBar'
import Pagenation from '@/components/base/Pagenation'
import SearchArticle from '@/components/kit/SearchArticle'
export default {
  name: 'ArticleCategory',
  components: {
    Card,
    BlogList,
    CardEmpty,
    SideBar,
    SearchArticle,
    Pagenation
  },
  async asyncData({ app, params, store }) {
    const typeList = store.getters.typeList
    typeList.length === 0 && (await store.dispatch('queryTypeList'))
    const typeId = store.getters.filterTypeIdByValue(params.type)
    const data = { page: 1, pageSize: 10, typeId, status: 1 }
    const { rows: blogList, count } = await app.$API.article.query(data)
    return { blogList, total: count }
  },
  data() {
    return {
      blogList: [],
      page: 1,
      pageSize: 10,
      total: null
    }
  },
  head() {
    return {
      title: `${this.$route.params.type} - 小九的博客`
    }
  },
  computed: {
    ...mapGetters(['typeList'])
  },
  methods: {
    changePage(page) {
      this.page = page
      this.queryArticle()
    },

    handleSearch(keyword) {
      this.$router.push({ path: '/article/search', query: { keyword } })
    },

    async queryArticle() {
      const typeId = this.$store.getters.filterTypeIdByValue(
        this.$route.params.type
      )
      const params = { page: this.page, pageSize: this.pageSize, typeId, status: 1 }

      try {
        const { rows: blogList, count: total } = await this.$API.article.query(
          params
        )
        Object.assign(this, { blogList, total })
      } catch (error) {}
    }
  }
}
</script>

<style lang="less" scoped>
.list-side {
  position: sticky;
  top: @heightHeader + 20;
}
.z-card.search-wrap {
  background-image: @color;
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
