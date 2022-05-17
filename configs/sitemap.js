/**
 * @desc seo要用的
 *       生成sitemap网站地图 替换为自己网站域名即可
 */
const axios = require('axios')
const globleConfig  = require('../configs')

const sitemap = [
  {
    path: '/sitemap.xml', // 生成的文件路径
    hostname: 'https://jiangly.com/',
    cacheTime: 1000 * 60 * 60 * 24, // 1天 更新频率，只在 generate: false有用
    gzip: true,
    generate: false,
    exclude: ['/404'],
    defaults: {
      changefreq: 'always',
      lastmod: new Date()
    },
    routes: async () => {
      const routes = [{ url: '/', changefreq: 'always', lastmod: new Date() }]
      const baseURL = globleConfig.baseURL
      const data  = await axios.get(`${baseURL}/api/article/query`,{ params: { pageSize: 100 }})
      const article = data.data.data.rows
      article.forEach( t => {
        const route = { url: `/article/detail/${t.id}`, changefreq: 'always', lastmod: new Date() }
        routes.push(route)
      })
      return routes
    }
  }
]
module.exports = sitemap

