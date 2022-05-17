const path = require('path')
const sitemap = require('./configs/sitemap')
const globleConfig  = require('./configs/index')

process.env.baseURL = globleConfig

module.exports = {
  mode: 'universal',
  head: {
    title: 'snine - 小九的个人博客',
    htmlAttrs: { lang: 'zh-cn' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'baidu_union_verify', content: '0c9d600d613529d74ed197e053e38775' },
      {
        hid: 'description',
        name: 'description',
        content: '小九（Snine）、来自98的前端程序员、热爱工作、热爱生活、喜欢安安静静的写代码、也喜欢安安静静的创作、用思考驱动技术、享受技术的乐趣'
      },
      { name: 'format-detection', content: 'telephone=no' },
      {
        hid: 'author',
        name: 'author',
        content: 'Snine,小九,青柠'
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: '小九的博客,小九,Snine,个人博客,前端文章,前端博客,前端技术,全栈开发,Node,nodeJs,小九Snine'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    /* 百度统计  申请之后替换自己的 */
    script: [
      { src: "https://hm.baidu.com/hm.js?9efee4873b87292f97dbf8b4fc570472" },
    ]
  },
  css: [
    '@/assets/css/index.less',
    '@assets/css/font.css',
    '@assets/css/transition.css',
  ],
  plugins: [
    { src: '~/plugins/axios.js', ssr: true },
    { src: '~/plugins/element-ui.js', ssr: false },
    { src: '~/plugins/api-repositories.js', ssr: true },
    { src: '~/plugins/socket.js', mode: 'client', ssr: false },
    { src: '~/plugins/storeCache', ssr: false },
    { src: '@/plugins/svgIcon', ssr: true },
    { src: '@/plugins/format', ssr: true },
    { src: '~/plugins/directive/loading/index.js', ssr: false },
    { src: '~/plugins/baidu.js' }
  ],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/toast',
    '@nuxtjs/sitemap'
  ],
  sitemap,
  styleResources: {
    less: '@/assets/css/variables.less'
  },
  toast: {
    theme: 'bubble',
    position: 'top-center',
    duration: 3000,
    singleton: false,
    iconPack: 'custom-class'
  },
  axios: {
    proxy: process.env.NODE_ENV === 'development', // 仅测试环境开启代理
    credentials: process.env.NODE_ENV === 'development', // 生产环境开启的情况下需要保证后端【跨域不为*】
    headers: {
      'Access-Control-Allow-Origin': '*',
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json; charset=UTF-8'
    },
    baseURL: globleConfig.baseURL
  },
  proxy: {
    '/api': {
      target: globleConfig.baseURL,
      changeOrigin: true
    }
  },
  build: {
    vendor: ['element-ui'],
    extend(config, ctx) {
      const svgRule = config.module.rules.find((rule) => rule.test.test('.svg'))
      svgRule.exclude = [path.resolve(__dirname, 'assets/icons/svg')]
      config.module.rules.push({
        test: /\.svg$/,
        include: [path.resolve(__dirname, 'assets/icons/svg')],
        loader: 'svg-sprite-loader',
        options: {
          symbolId: 'icon-[name]'
        }
      })
    },
    router: {
      linkActiveClass: 'active-link',
      scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
      }
    },
  },
  env: {
    baseUrl: globleConfig.baseURL
  },
  server: {
    port: 6888, // default: 3000
    host: '0.0.0.0'
  },
  telemetry: false
}
