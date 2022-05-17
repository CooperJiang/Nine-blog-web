<template>
  <div class="app-content">
    <div class="s-container">
      <div class="s-row blog-mobile">
        <div class="s-col-md-42 s-col-xl-45">
          <template v-if="blogList && blogList.length">
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
        <div ref="sidebar" class="sidebar s-col-md-18 s-col-xl-15">
          <card class="search-wrap">
            <search-article @on-search="handleSearch" />
          </card>
          <side-bar />
          <div ref="otherInfo" class="other">
            <card v-if="blogList.length === 10" :style="{marginTop: '20px'}" :padding="15" title="关于我">
              <about-me />
            </card>
            <card :style="{ marginTop: '20px' }" :padding="15" title="天气信息">
              <div id="he-plugin-standard" class="weather"></div>
            </card>

            <card v-if="blogList.length === 10" :style="{marginTop: '20px'}" :padding="30" title="站长信息">
              <persion-info />
            </card>
            <card v-if="blogList.length === 10" :style="{ marginTop: '20px' }" :padding="30" title="外卖优惠">
              <Advertising />
            </card>
          </div>
        </div>
        <div ref="fixedInfo" class="sidebar fixedInfo s-col-md-18 s-col-xl-15">
          <card class="search-wrap">
            <search-article @on-search="handleSearch" />
          </card>
          <side-bar />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/base/Card'
import BlogList from '@/components/page/BlogList'
import sideBar from '@/components/page/SideBar'
import Pagenation from '@/components/base/Pagenation'
import Advertising from '@/components/kit/Advertising'
import CardEmpty from '@/components/kit/CardEmpty'
import PersionInfo from '@/components/kit/PersionInfo'
import AboutMe from '@/components/kit/AboutMe'
import SearchArticle from '@/components/kit/SearchArticle'

export default {
  components: {
    Card,
    BlogList,
    sideBar,
    Pagenation,
    CardEmpty,
    SearchArticle,
    PersionInfo,
    Advertising,
    AboutMe
  },
  async asyncData({ app, store }) {
    const res = await app.$API.article.query({status: 1})
    const { rows: blogList, count: total } = res
    return { blogList, total }
  },
  data() {
    return {
      blogList: [],
      total: 0,
      page: 1,
      pageSize: 10,
      timer: null,
    }
  },
  async fetch({ store }) {
    await store.dispatch('queryTypeList')
  },
  head() {
    return {
      title: '文章列表 - 小九的博客',
      meta: [
        {
          hid: 'article-index',
          name: 'articleIndex',
          content: 'My blog article page'
        }
      ]
    }
  },
  mounted(){
    this.observerDom()
  },
  created(){
    this.initWeather()
  },
  methods: {
    changePage(page) {
      this.page = page
      this.queryArticle()
    },
    async queryArticle() {
      const params = { page: this.page, pageSize: this.pageSize, status: 1 }
      try {
        const { rows: blogList, count: total } = await this.$API.article.query( params )
        Object.assign(this, { blogList, total })
        this.initWeather()
      } catch (error) {}
    },
    handleSearch(keyword) {
      this.$router.push({ path: '/article/search', query: { keyword } })
    },
    observerDom(){
      const options = { root: null, threshold: [0] }
      const io = new IntersectionObserver(this.changeClass, options)
      io.observe(this.$refs.otherInfo)
    },
    changeClass(entries){
      const isVisible = entries[0].isIntersecting
      if(!this.$refs.fixedInfo) return;
      this.$refs.fixedInfo.style.display = isVisible ? 'none' : 'block';
    },
    changeWeatherWidth() {
      this.timer = setInterval(() => {
        const weatherDom = document.getElementById('he-plugin-standard');
        const domW = getComputedStyle(weatherDom,false).width
        if(domW === '2px'){
          weatherDom.style.width = '100%'
          clearInterval(this.timer)
        }
      }, 100);
    },
    initWeather() {
      if(process.browser) {
        window.WIDGET = {
          "CONFIG": {
            "layout": "2",
            "width": 2,
            "height": 270,
            "background": "1",
            "dataColor": "FFFFFF",
            "borderRadius": "5",
            "key": "ef00d2dcb9a34cb09fc591009d55c94a"
          }
        }
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0';
        document.getElementsByTagName('head')[0].appendChild(script);
        this.changeWeatherWidth()
      }
    }
  }
}
</script>
<style lang="less" scoped>
.z-card.search-wrap {
  background-image: @color;
}
.fixedInfo{
  position: sticky;
  top: 15px;
  transition: all .3s;
}
.weather{
  transition: all .5s;
}
@media (min-width: @breakpoints-xs) and (max-width: 767px) {
  .blog-mobile {
    display: flex;
    flex-direction: column-reverse;
    .sidebar {
      position: relative;
      top: 0;
      margin-bottom: 20px;
    }
    .other,
    .fixedInfo {
      display: none !important;
    }
  }
}
</style>
