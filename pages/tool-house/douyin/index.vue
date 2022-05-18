<template>
    <div class="s-container douyin">
      <div class="douyin-container  s-row">
        <div class="left s-col-md-42 s-col-xl-45">
          <div class="tools">
            <h1 class="tools-title">抖音视频去水印</h1>
            <div class="tools-desc">
                <li>抖音视频右下角点击分享、复制链接、粘贴至下方窗口即可解析不需要截取地址！</li>
                <li>1. 获取完整无水印视频</li>
                <li>2. 获取单独音频文件</li>
                <li>3. 获取视频文案信息</li>
                <li>4. 视频协议暂不支持ios移动端在线预览</li>
            </div>
            <div class="tools-content">
              <div class="hd">
                <el-input v-model="url"  size="small" placeholder="请截取复制内容的正确视频地址解析"></el-input>
                <el-button class="m_l10" size="small" @click="toolsDouyin">解析</el-button>
              </div>
            </div>
            <div  v-if="mp3 && mp4" class="tools-tips">
              Tips: 点击链接也可复制
            </div>
            <transition name="fade" mode="out-in">
              <div v-if="mp3 && mp4" class="tools-result">
                <div class="tools-result-item mp3" :data-clipboard-text="mp3" @click="copy('.mp3')">
                  <span class="label">音频地址:</span>
                  <code class="value" >{{mp3}}</code>
                  <el-button size="small" type="text" >复制</el-button>
                </div>
                <div class="tools-result-item mp4" :data-clipboard-text="preVideoUrl" @click="copy('.mp4')">
                  <span class="label">视频地址:</span>
                  <code class="value">{{preVideoUrl}}</code>
                  <el-button size="small" type="text">复制</el-button>
                </div>
                <div class="tools-result-item title" :data-clipboard-text="title" @click="copy('.title')">
                  <span class="label">文案信息:</span>
                  <code class="value">{{title}}</code>
                  <el-button size="small" type="text">复制</el-button>
                </div>
                <div class="tools-result-pre">
                  <div class="pre-item">
                    <span class="m_r20">音频预览:</span>
                    <mine-player class="m_b10" :padding='0' :autoplay="false" :src="mp3" />
                  </div>
                  <div class="pre-item">
                    <span class="m_r20">视频下载:</span>
                     <a :href="preVideoUrl" download target="_blank">  <icon icon="tools-douyin-download" :size="28" class="icon" /></a>
                  </div>
                  <div class="pre-item">
                    <span class="m_r20">视频预览:</span>
                     <icon icon="tools-douyin-pre" :size="28" class="icon" @click.native="preMp4" />
                  </div>
                  <div v-if="preVideo && preVideoUrl" class="pre-item">
                    <video v-if="preVideo && preVideoUrl" ref='video' webkit-playsinline class="pre-video m_t10"   controls>
                      <source  type="video/mp4">
                      <!-- <source :src="preVideoUrl" type="video/mp4"> -->
                      您的浏览器不支持Video标签。
                    </video>
                  </div>
                </div>
              </div>
            </transition>

          </div>
          <card class="message-form" style="margin-top: 20px">
              <title-bar :bottom="20" title="提点儿建议吧"></title-bar>
              <comment-box type="message" :article-id="articleId" @on-success="handleCommentsSuccess" />
          </card>
          <div style="margin-top: 20px">
            <card v-if="commentsList.length" padding="20px">
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
            <card-empty v-else style="height: 300px;margin-bottom: 20px" />
          </div>
        </div>
        <div class="right s-col-md-18 s-col-xl-15">
          <card :padding="15" title="联系我">
            <about-me />
          </card>
          <card :style="{ marginTop: '20px' }" :padding="30" title="外卖优惠">
            <Advertising />
          </card>
        </div>
      </div>
    </div>
</template>

<script>
import Clipboard from 'clipboard'
import Config from "../../../configs/clientConfig"
import Card from '@/components/base/Card'
import TitleBar from '@/components/kit/TitleBar'
import CommentBox from '@/components/kit/CommentBox'
import CardEmpty from '@/components/kit/CardEmpty'
import CommentItem from '@/components/kit/CommentItem/index.vue'
import Pagenation from '@/components/base/Pagenation'
import MinePlayer from '@/components/kit/MinePlayer'
import Icon from '@/components/base/Icon'
import AboutMe from '@/components/kit/AboutMe'
import Advertising from '@/components/kit/Advertising'

export default {
  components: {Card,TitleBar,CommentBox,CardEmpty,CommentItem,Pagenation,MinePlayer,Icon,AboutMe,Advertising},
  data() {
    return {
      url: null,
      mp3: null,
      mp4: null,
      title: null,
      articleId: 100001, // 先自定义id100001 代表是工具类型的评论 后续加字段扩展此模块
      commentsList: [],
      preVideo: false,
      params: {
        page: 1,
        pageSize: 10,
      },
      preVideoUrl: null
    };
  },
  watch: {
    url(n,o){
      const reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+).)+([A-Za-z0-9-~\\/])+$/;
      if(!reg.test(n)){
        this.url = n.replace(/(.*\s)([(http(s)?):\\/\\/(www\\.)?a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*))(\s.*)/, '$2');
      }
    }
  },
  created() {
    this.requestCommentsList()
  },
  methods: {
    copy (dom) {
      const clipboard = new Clipboard(dom)
      clipboard.on('success', e => {
        this.$toast.success("复制成功、快去试试吧~")
        process.browser && clipboard.destroy()
      })
    },
    handleCommentsSuccess() {
      this.$toast.success('评论成功...')
      this.requestCommentsList()
    },

    checkUrl(url){
      const reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+).)+([A-Za-z0-9-~\\/])+$/;
      return reg.test(url)
    },

    async requestCommentsList() {
      const params = this.params
      this.articleId && (params.articleId = this.articleId);
      const { rows, count } = await this.$API.comment.query(params)
      this.commentsList = rows
      this.total = count
    },

    changePage(val) {
      this.params.page = val
      this.requestCommentsList()
    },

    async toolsDouyin(){
      if(!this.url || !this.checkUrl(this.url)) return this.$toast.error("请检查您的视频地址是否输入正确~");
      const res = await this.$API.tools.douyin({url: this.url}).catch( err => {
        if(err){
          this.url = null;
          return this.$toast.error("请检查您的视频地址是否输入正确~")
        }
      })
      const { mp3, mp4, title } = res
      /* 开发环境下可能出现跨域，可以先调用生产的接口或者本地开发的时候不预览视频 */
      const prefix = process.env.NODE_ENV === 'development' ? 'https://api.jiangly.com' : Config.baseURL
      this.preVideoUrl = `${prefix}/api/tools/douyinload?url=${mp4}`
      Object.assign(this, { mp3, mp4, title })
    },
    preMp4(){
      this.preVideo = true
      this.$nextTick(() => {
        this.$refs.video.src = this.preVideoUrl
        this.$refs.video.play()
      })
    }
  },
}
</script>
<style lang='less' scoped>
.douyin{
  min-height: calc(100vh - 350px);
  &-container{
    height: 100%;
    .left{
      .tools{
        background: #fff;
        padding: 15px;
        &-title{
          color: #444;
          font-size: 16px;
        }
        &-desc{
          margin-left: 10px;
          padding: 15px 0;
          li{
            color: #333;
            margin: 4px 0;
            list-style: none;
          }
        }
        &-content{
          padding: 15px 10px;
          border: 2px dashed #ccc;
          .hd{
            display: flex;
          }
        }
        &-result{
          padding: 25px 10px;
          &-item{
            display: flex;
            margin-top: 5px;
            .label{
              word-break: keep-all;
            }
            .value{
              flex: 1;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              margin-left: 2px;
              cursor: pointer;
              user-select: all;
              padding: 0 5px;
            }
            .btn{
              margin-left: 5px;
            }
          }
          &-pre{
            margin-top: 20px;
            border: 2px dashed #ccc;
            padding: 10px;
            .pre-item{
              word-break: keep-all;
              font-size: 16px;
              margin-top: 10px;
              color: #444;
              font-weight: 500;
              display: flex;
              align-items: center;
              .icon{
                cursor: pointer;
                &:hover{
                  transform: scale(1.1);
                  color: #51a0e2;
                }
              }
              .pre-video{
                width: 100%;
                max-height: 400px;
              }
            }
          }
        }
        &-tips{
          margin: 15px 0 0 10px;
          font-size: 20px;
          font-weight: 600;
          color: #444;
        }

      }
    }
    .right{
      position: sticky;
      top: 15px;
    }

  }

  @media (min-width: @breakpoints-xs) and (max-width: @breakpoints-lg) {
    .left{
      width: 100%;
    }
    .right{
      display: none;
    }
  }
}
</style>
