/**
 * @uploadURL 当前提供一个小服务器测试地址 替换成自己的上传接口即可，然后在接口上传成功的地方获取资源地址的接口格式替换下 全局搜:success
 */
const devConfig = {
  baseURL: 'http://localhost:3000',
  wsURL: 'http://localhost:3002',
  uploadURL: 'https://file.jiangly.com/api/upload/file'
}
const proConfig = {
  baseURL: 'https://api.xxxx.com',
  wsURL: 'https://ws.xxxxx.com',
  uploadURL: 'https://file.jiangly.com/api/upload/file'
}
const config = process.env.NODE_ENV === 'development' ? devConfig : proConfig
export default config
