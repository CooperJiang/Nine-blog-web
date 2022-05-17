<template>
  <div class="app-tools">
    <bill-board
      :poster="banneImg"
      title="工具屋"
      title-sub="开发日常使用的小工具！"
      is-page
      poster-blue="0"
      height="350px"
    >
    </bill-board>
    <div class="s-container">
      <div class="s-row">
        <div v-if="toolsData.length" class="tools">
          <div
            v-for="(item, index) in toolsData"
            :key="index"
            class="tools-item s-col-xl-15 s-col-lg-20 s-col-md-30 s-col-sm-30 s-col-xs-60"
          >
            <div class="tool">
                <div class="tool-hd">
                  <img :src="item.logo"  :alt="item.name" class="tool-hd-logo" @click="useTool(item)">
                  <div class="tool-hd-info">
                    <b>{{item.name}}</b>
                    <div class="join" @click="loveTool">
                      加入收藏
                    </div>
                  </div>
                  <div class="tool-hd-type">[{{item.toolName}}]</div>
                </div>
                <div class="tool-bd">{{item.desc}}</div>
                <div class="tool-ft">
                  <span class="path">{{item.path}}</span>
                  <span class="btn" @click="useTool(item)">进入</span>
                </div>
            </div>
          </div>
        </div>
        <card-empty v-else style="height: 300px; margin-top: 30px" />
      </div>
    </div>
  </div>
</template>

<script>
import BillBoard from '@/components/kit/BillBoard'
import CardEmpty from '@/components/kit/CardEmpty'

const banneImg = require('@/assets/images/home/banner_resource.gif')
export default {
  components: { CardEmpty,  BillBoard  },
  async asyncData({ app }) {
    const res = await app.$API.tools.query()
    return { toolsData: res.rows }
  },
  data() {
    return {
      banneImg,
      toolsData: []
    }
  },
  methods: {
    useTool(item){
      const { path } = item
      if(!path) return this.$toast.info('工具内容逐步开放、还要再等等哟！')
      window.open(path, '_blank');
      // this.$router.push(path)
    },
    loveTool(){
      this.$toast.info("这个功能还没开放呢、请再等等吧！")
    }
  }
}
</script>

<style lang="less" scoped>
.app-tools {
  margin-top: -@heightHeader - 20;
  width: 100%;
  .tools {
    width: 100%;
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    &-item {
      margin-top: 15px;
      .tool {
        width: 100%;
        border: 1px solid #ccc;
        background: #fff;
        border-radius: 4px;
        transition: box-shadow .3s ease-in-out;
        padding: 10px 15px 10px 12px;
        position: relative;
        background-size: cover !important;
        &-hd{
          color: #333;
          display: flex;
          &-logo{
            width: 48px;
            user-select: none;
            -webkit-user-drag: none;
            cursor: pointer;
            border-radius: 50%;
          }
          &-info{
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 2px 10px;
            cursor: pointer;
            .join{
              font-size: 12px;
              user-select: none;
            }
          }
          &-type{
            padding: 0;
            display: flex;
            margin-bottom: 2px;
            font-weight: 600;
            justify-content: flex-end;
            align-items: flex-end;
            color: #444;
            font-size: 12px;
          }
        }
        &-bd{
          padding: 18px 0 10px 0;
          min-height: 40px;
          color: rgb(153, 152, 152);
          padding-left: 3px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        &-ft{
          display: flex;
          justify-content: space-between;
          padding-left: 3px;
          .path{
            color: #999;
          }
          .btn{
            cursor: pointer;
          }
        }
        &:hover {
         box-shadow: 0 3px 8px 0 rgba(0,0,0,0.2);
        }
      }
    }
  }
}
</style>
