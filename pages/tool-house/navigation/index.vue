<template>
  <div class="app-navigation">
    <!-- <bill-board
      :poster="banneImg"
      title="WEB前端资源"
      title-sub="前端资源库、收集最新的好看好玩好用的前端资源！"
      is-page
      poster-blue="0"
      height="350px"
    >
    </bill-board> -->
    <div class="s-container resource-list">
      <template v-if="resourceData && resourceData.length > 0">
        <div v-for="resource in resourceData" :key="resource._id">
          <title-bar :title="resource.name"></title-bar>
          <div
            v-if="resource.resource && resource.resource.length > 0"
            class="s-row"
            style="margin-bottom: 20px"
          >
            <div
              v-for="resourceItem in resource.resource"
              :key="resourceItem.id"
              class="
                resource-item-wrap
                s-col-xl-12 s-col-lg-15 s-col-md-20 s-col-sm-30 s-col-xs-30
              "
            >
              <div class="resource-item">
                <a
                  :href="resourceItem.url"
                  class="resource-item-link"
                  target="_blank"
                >
                  <div class="resource-info-title">
                    <div class="resource-item-poster">
                      <img
                        v-if="resourceItem.logo"
                        :src="resourceItem.logo"
                        alt="资源海报"
                      />
                      <div v-else class="no-img">
                        {{ resourceItem.name.substring(0, 1) }}
                      </div>
                    </div>
                    <h4 class="resource-header">{{ resourceItem.name }}</h4>
                  </div>
                  <p :title="resourceItem.desc" class="resource-dis">
                    {{ resourceItem.desc }}
                  </p>
                </a>
              </div>
            </div>
          </div>
          <card-empty v-else style="height: 220px" />
        </div>
      </template>

      <template v-else style="height: 300px">
        <card>
          <card-empty />
        </card>
      </template>
    </div>
  </div>
</template>

<script>
// import BillBoard from '@/components/kit/BillBoard'
import TitleBar from '@/components/kit/TitleBar'
import Card from '@/components/base/Card'
import CardEmpty from '@/components/kit/CardEmpty'
const banneImg = require('@/assets/images/home/banner_resource.gif')
export default {
  components: { TitleBar, Card, CardEmpty },
  // layout: 'empty',
  async asyncData({ app }) {
    const { rows } = await app.$API.resourceType.queryAll()
    return { resourceData: rows }
  },
  data() {
    return {
      banneImg,
      resourceData: []
    }
  },
  head() {
    return {
      title: '资源导航 - 小九的博客',
      meta: [{ hid: 'navigation', name: 'navigation', content: 'My blog navigation'}]
    }
  }
}
</script>

<style lang="less" scoped>
.app-navigation {
  // margin-top: -@heightHeader + 20;
  .resource-list {
    margin-top: 10px;
    padding: 20px;
    background: #fff;
    min-height: calc(100vh - 570px);
    .resource-item-wrap {
      position: relative;
      .resource-item {
        position: relative;
        margin-bottom: 30px;

        &::before {
          content: '';
          background-color: #fff;
          height: 3px;
          margin-left: auto;
          margin-right: auto;
          position: absolute;
          left: 0.25rem;
          right: 0.5rem;
          bottom: -4px;
          border: 1px solid @colorBorder;
          border-top: none;
          box-shadow: 0 4px 8px 0 rgba(7, 17, 27, 0.1);
          z-index: 2;
        }
        &::after {
          content: '';
          background-color: #fff;
          height: 8px;
          margin-left: auto;
          margin-right: auto;
          position: absolute;
          bottom: -8px;
          left: 0.5rem;
          right: 0.25rem;
          border: 1px solid @colorBorder;
          border-top: none;
          box-shadow: 0 4px 8px 0 rgba(7, 17, 27, 0.1);
          z-index: 1;
        }
        .resource-item-link {
          position: relative;
          display: block;
          padding: 10px;
          border: 1px solid @colorBorder;
          transform: translate(0);
          transition: transform 0.26s, box-shadow 0.26s;
          z-index: 10;
          background: #fff;
          .resource-info-title {
            display: flex;
            align-items: center;
            .resource-item-poster {
              flex: none;
              width: 38px;
              height: 38px;
              text-align: center;
              overflow: hidden;
              img {
                width: 100%;
                height: 100%;
                object-fit: contain;
              }
              .no-img {
                width: 100%;
                height: 100%;
                line-height: 38px;
                background-color: #c3c4ce;
                border-radius: 50%;
                font-size: 22px;
                font-weight: 700;
                color: #fff;
              }
            }
            .resource-header {
              flex: 1;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              margin-left: 10px;
              font-size: 16px;
              font-weight: normal;
            }
          }

          .resource-dis {
            margin-top: 10px;
            height: 4.5em;
            width: 100%;
            overflow: hidden;
            font-size: 12px;
            line-height: 1.5;
            color: @colorTextSub;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
          }
        }
        &:hover .resource-item-link {
          transform: translateY(10px);
          box-shadow: 0 4px 8px 0 rgba(7, 17, 27, 0.1);
        }
      }
    }
  }
}
</style>
