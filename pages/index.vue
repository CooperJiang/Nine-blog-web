<template>
  <div class="page">
    <bill-board :poster="bannerImg" poster-blue="0" height="680px" is-home-page>
      <div class="page-slogan">
        <rotating-text :words="words" width="3.4em" /><span class="visible-xl visible-md visible-sm m_l10"> 、而后风生水起</span>
      </div>
      <div class="page-slogan-sub m_t10">
        <rotating-text :words="words2" width="3.0em" />、 say never
      </div>
      <div class="banner-btn-wrap">
        <a class="banner-btn bbtn1" @click="handleGoGithub"
          ><i class="iconfont icongithub"></i><span>Github</span></a
        >
        <a class="banner-btn bbtn2" @click="handleGoBlog"
          ><span>进入博客</span></a
        >
      </div>
    </bill-board>
    <div class="page-content">
      <section class="section-part section-part-module">
        <section-title
          title="网站介绍"
          decs="主要介绍网站各个模块用到了哪些技术"
        ></section-title>

        <div class="s-container">
          <div class="section-module-cont">
            <div class="section-module-img hidden-xs hidden-sm"></div>
            <div class="section-module-card">
              <section-card title="前端服务" icon="home_article">
                采用 Nuxt.js 实现一套 SSR 服务端渲染的博客系统。
              </section-card>
              <section-card title="导航资源" icon="home_resouse">
                前端添加资源链接、通过 cheeiro 爬取网站介绍、图片、文章等。
              </section-card>
              <section-card title="后台管理" icon="home_admin">
                采用vue3 + vite + element-plus 开发后台管理系统进行实时编辑。
              </section-card>
              <section-card title="接口开发" icon="home_api" >
                使用nestjs作为开发框架、mysql 作为数据库、基于docker、gitlab实现自动化部署。
              </section-card>
              <section-card title="聊天互动" icon="home_chat">
                采用socker.io开发的在线互动聊天室、用于实时通信。
              </section-card>
            </div>
          </div>
        </div>
      </section>

      <section class="section-part section-part-contact">
        <section-title
          title="你可以在这些场所找到我"
          theme="light"
        ></section-title>
        <div class="s-container">
          <ul class="contact-list">
            <li
              v-for="item in aboutMe"
              :key="item.icon"
              class="contact-list-item"
            >
              <a
                class="contact-list-item-link"
                target="_blank"
                rel="noopener noreferrer"
                :href="item.url"
              >
                <icon
                  :size="item.size"
                  :icon="item.icon"
                  class="contact-list-item-icon"
                ></icon>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section class="section-part section-part-about">
        <section-title title="关于我的"></section-title>
        <div class="s-container">
          <div class="text">
            我叫小九、你也可以称呼我为nine。<br />一位来自98年的前端程序员。<br />在一个偶然的机会下接触到前端这个职业、沉醉其中，直至...<br />喜欢安安静静的写代码、也喜欢痛痛快快的打游戏。
          </div>
          <div class="bike"></div>
          <div class="text">
            如果你也喜欢前端，<br />那么很高兴认识你~ 交个朋友吧！
          </div>
        </div>
      </section>

      <section class="section-part section-part-links">
        <section-title title="友情链接"></section-title>
          <FriendsLinks :links='links' />
      </section>
    </div>
  </div>
</template>

<script>
import SectionTitle from '@/components/page/home/section-title.vue'
import SectionCard from '@/components/page/home/section-card.vue'
import BillBoard from '@/components/kit/BillBoard'
import RotatingText from '@/components/kit/RotatingText'
import Icon from '@/components/base/Icon'
import FriendsLinks from '@/components/kit/FriendsLinks'
// const bannerImg = require('@/assets/images/home/banner.jpg')
// const bannerImg = require('@/assets/images/home/banner_home.jpg')

export default {
  name: 'Index',
  components: {
    BillBoard,
    RotatingText,
    Icon,
    SectionTitle,
    SectionCard,
    FriendsLinks
  },
  async asyncData({ app }) {
    const res = await app.$API.friendLinks.query({status:1})
    return { links: res.rows}
  },
  data() {
    return {
      loading: true,
      // bannerImg: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0156cb59439764a8012193a324fdaa.gif&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647230249&t=f4cc56ad00ce22d69a7f406e2e20652c",
      // bannerImg: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.90sjimg.com%2Fback_pic%2F00%2F00%2F69%2F40%2F30a5986e6b9d601e85d115e64a6b290b.jpg&refer=http%3A%2F%2Fpic.90sjimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647230292&t=3de7a94704c80ef2d24051f14fead990",
      bannerImg: "",
      words: [
        { label: '日益努力', color: '#2db7f5' },
        { label: '日益努力', color: '#38B9CC' },
        { label: '日益努力', color: '#49BC8D' },
        { label: '日益努力', color: '#6bc30d' }
      ],
      words2: [
        { label: 'Never', color: '#2db7f5' },
        { label: 'Never', color: '#38B9CC' },
        { label: 'Never', color: '#49BC8D' },
        { label: 'Never', color: '#6bc30d' }
      ],
      links: [],
      aboutMe: [
        { url: 'https://github.com/longyanjiang', size: 40, icon: 'github' },
        {
          url: 'https://juejin.cn/user/3861140568811576/posts',
          size: 40,
          icon: 'juejin'
        },
        { url: 'https://gitee.com/jlongyan', size: 40, icon: 'gitee' }
      ]
    }
  },
  head() {
    return {
      title: '小九的博客 - 首页',
      meta: [
        {
          hid: 'home-index',
          name: 'homeIndex',
          content: 'My blog home page'
        }
      ]
    }
  },
  created(){
    this.checkPlatForm()
  },
  mounted(){
    window.onresize=() => this.checkPlatForm()
  },
  methods: {
    handleGoGithub() {
      window.open('https://github.com/longyanjiang', '_blank')
    },
    handleGoBlog() {
      this.$router.push('/article')
    },
    checkPlatForm(){
      if(!process.browser) return;
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        this.bannerImg = "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201503%2F08%2F20150308190252_QLA4f.jpeg&refer=http%3A%2F%2Fcdn.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647842674&t=1fedd22fb4ff3d871882e00dcba394fd"
      } else {
        this.bannerImg = "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.90sjimg.com%2Fback_pic%2F00%2F00%2F69%2F40%2F30a5986e6b9d601e85d115e64a6b290b.jpg&refer=http%3A%2F%2Fpic.90sjimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647230292&t=3de7a94704c80ef2d24051f14fead990"
      }
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  margin-top: -@heightHeader - 20;
}
.page-content {
  position: relative;
  min-height: 500px;
  background-color: @colorBgBody;
}
.page-slogan {
  padding: 0 30px;
  font-size: 40px;
  height: 50px;
  font-weight: normal;
  margin-bottom: 5px;
  color: #fff;
  user-select: none;
  display: flex;
  justify-content: center;
}
.page-slogan-sub {
  user-select: none;
  font-size: 32px;
  color: #fff;
}
.banner-btn-wrap {
  user-select: none;
  margin-top: 60px;
}
.banner-btn {
  i {
    font-size: 26px;
    margin-right: 10px;
  }
  i,
  span {
    vertical-align: middle;
    line-height: 1;
  }

  display: inline-block;
  width: 240px;
  height: 50px;
  padding: 10px;
  border: none;
  line-height: 30px;
  font-size: 18px;
  margin: 20px;
  // border: none;
  border-radius: 50px;
  color: #fff;
  background-color: transparent;
  cursor: pointer;
  &.bbtn1 {
    background-image: linear-gradient(
      90deg,
      rgba(45, 183, 245, 0.75),
      rgba(107, 195, 13, 0.75)
    );
    &:hover {
      background-image: linear-gradient(90deg, #2db7f5, #6bc30d);
      color: #fff;
    }
  }
  &.bbtn2 {
    padding: 8px 10px;
    border: 2px solid @colorBorder;
    opacity: 0.75;
    &:hover {
      opacity: 1;
      background-color: transparent;
      border-color: @colorPrimary;
      span {
        background-image: @color;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        -webkit-box-decoration-break: clone;
        box-decoration-break: clone;
      }
    }
  }
}
.section-part {
  min-height: 300px;
  padding: 80px 20px;
}
.section-part-module {
  background: #fff;
  .section-module-cont {
    display: flex;
    justify-content: center;
    align-items: center;
    .section-module-img {
      flex: none;
      width: 200px;
      height: 200px;
      border-radius: 50%;
      border: 20px solid @colorTextDisable;
      background-image: url('../assets/images/logo.png');
      background-size: 50%;
      background-position: center;
      background-repeat: no-repeat;
    }
    .section-module-card {
      position: relative;
      overflow: hidden;
      padding-left: 140px;
      &::before {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        left: -360px;
        transform: translateY(-50%);
        width: 500px;
        height: 500px;
        border-radius: 50%;
        border: 2px solid @colorTextSilver;
      }
    }
  }
}
.section-part-contact {
  position: relative;
  background-image: url(~assets/images/home/bg1.jpg);
  background-position: center center;
  background-size: cover;
  background-attachment: fixed;
  &::before {
    content: '';
    backdrop-filter: blur(7px);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
  }
}
.section-part-about {
  background: #fff;
  @keyframes changes {
    0% {
      background-position: 0 0;
    }
    20% {
      background-position: -190px 0;
    }
    40% {
      background-position: -380px 0;
    }
    60% {
      background-position: 0 -100px;
    }
    80% {
      background-position: -190px -100px;
    }
    100% {
      background-position: -380px -100px;
    }
  }
  .bike {
    margin: 50px auto;
    width: 190px;
    height: 100px;
    background: url(~assets/images/home/sprite-velo.png);
    animation: changes 0.5s steps(1, start) infinite;
  }
  .text {
    text-align: center;
    font-size: 16px;
    line-height: 30px;
    color: #282828;
  }
}
.contact-list {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .contact-list-item {
    margin: 0 20px;
    list-style: none;
    text-align: center;
    .contact-list-item-link {
      position: relative;
      display: block;
      height: 60px;
      width: 60px;
      border-radius: 50%;
      border: 1px solid @colorTextDisable;
      color: @colorTextDisable;
    }
    &:nth-child(1):hover {
      .contact-list-item-link {
        border-color: #fff;
        color: #fff;
      }
    }
    &:nth-child(2):hover {
      .contact-list-item-link {
        border-color: #fff;
        color: #3780f7;
      }
    }
    &:nth-child(3) :hover {
      color: #bb232b;
      border-color: #fff;
    }
  }

  .contact-list-item-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
@media (min-width: @breakpoints-xs) and (max-width: @breakpoints-md) {
  .section-part-module {
    .section-module-cont {
      .section-module-card {
        padding-left: 0;
        &::before {
          display: none;
        }
      }
    }
  }
}

.section-part-links {
  .links {
    text-align: center;
    li {
      margin: 10px 20px;
      display: inline-block;
      a {
        font-size: 16px;
        color: @colorTextSub;
      }
      &:hover {
        a {
          @colorActive();
        }
      }
    }
  }
}
</style>
