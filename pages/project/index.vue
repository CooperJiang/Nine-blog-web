<template>
  <div class="app-project">
    <bill-board
      :poster="banneImg"
      title="项目板"
      title-sub="闲暇时间捣鼓的小项目！"
      is-page
      poster-blue="0"
      height="350px"
    >
    </bill-board>
    <div class="s-container">
      <div class="s-row m_t20">
        <div v-if="projectData.length" class="project">
          <div
            v-for="(item, index) in projectData"
            :key="index"
            class="
              project_item
              s-col-xl-20 s-col-lg-20 s-col-md-30 s-col-sm-30 s-col-xs-60
            "
          >
            <div
              class="project_container"
              :style="{ background: `url(${item.bgImage})` }"
            >
              <Icon
                v-if="item.hot === 1"
                icon="recommend-project"
                class="recommend"
                :size="36"
              />
              <div class="cover">
                <div class="title">{{ item.name }}</div>
                <div class="tag">
                  <div v-for="t in item.tag" :key="t" class="tag_item">
                    {{ t }}
                  </div>
                </div>
                <div class="date">
                  <span class="date_left">{{ item.createdAt | dateFormatFilter('YYYY年MM月DD日') }}</span> 至
                  <span class="date_right">{{ item.updatedAt | dateFormatFilter('YYYY年MM月DD日') }}</span></span>
                </div>
              </div>
              <div class="detail">
                <div class="detail_desc">
                  {{ item.desc }}
                </div>
                <div class="detail_footer">
                  <div v-if="item.path" class="link">
                    <Icon
                      icon="jump"
                      class="icon"
                      @click.native="$router.push(item.path)"
                    />
                  </div>
                  <a
                    v-if="item.link"
                    class="demo"
                    :href="item.link"
                    target="_blank"
                  >
                    <Icon icon="demo" class="icon" />
                  </a>
                  <a
                    v-if="item.git"
                    class="git"
                    :href="item.git"
                    target="_blank"
                  >
                    <Icon icon="github-project" class="icon" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <card-empty v-else style="height: 300px" />
      </div>
    </div>
  </div>
</template>

<script>
import BillBoard from '@/components/kit/BillBoard'
import CardEmpty from '@/components/kit/CardEmpty'
import Icon from '@/components/base/Icon'

const banneImg = require('@/assets/images/home/banner_111.gif')
export default {
  components: { BillBoard, CardEmpty, Icon },
  async asyncData({ app }) {
    const res = await app.$API.project.query({ status: 1 })
    res.rows.forEach((t) => (t.tag = t.tag.split(',')))
    return { projectData: res.rows }
  },
  data() {
    return {
      banneImg,
      projectData: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    jump({ path, link }) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="less" scoped>
.app-project {
  margin-top: -@heightHeader - 20;
  .project {
    margin-top: 20px;
    padding: 20px;
    // background: #fff;
    min-height: calc(100vh - 570px);
    display: flex;
    flex-wrap: wrap;
    &_item {
      color: #fff;
      padding: 10px;
      font-size: 15px;
      font-weight: 600;
      border-radius: 10px;
      text-align: center;
      overflow: hidden;
      cursor: pointer;
      position: relative;
      height: 250px;
      .project_container {
        width: 100%;
        height: 100%;
        border-radius: 8px;
        background-size: cover !important;
        .recommend {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 99;
          cursor: pointer;
        }
        .cover,
        .detail {
          background: rgba(0, 0, 0, 0.4);
          position: absolute;
          left: 25px;
          top: 25px;
          bottom: 25px;
          right: 25px;
          padding: 0 15px;
          transition: all 0.4s ease-in-out;
          border-radius: 5px;
          display: flex;
          flex-direction: column;
          align-items: center;
          .title {
            font-size: 18px;
            font-weight: 600;
          }
          .tag {
            margin-top: 20px;
            display: flex;
            &_item {
              font-size: 12px;
              padding: 0 10px;
              border-radius: 10px;
              margin-right: 5px;
              height: 20px;
              line-height: 20px;
              cursor: pointer;
              color: #000;
              display: inline-block;
              &:nth-child(1) {
                background-color: #ffe082;
              }
              &:nth-child(2) {
                background-color: #fff;
              }
            }
          }
          .date {
            display: flex;
            margin-top: 20px;
            font-size: 14px;
            font-weight: 700;
            &_left {
              margin-right: 10px;
            }
            &_right {
              margin-left: 10px;
            }
          }
        }
        .cover {
          opacity: 1;
          padding-top: 50px;
        }
        .detail {
          padding-top: 50px;
          padding-bottom: 20px;
          opacity: 0;
          transform: scale(0.9);
          display: flex;
          justify-content: space-between;
          align-items: center;
          &_footer {
            width: 100%;
            display: flex;
            justify-content: flex-end;

            .link {
              transition: all 0.3s;
              &:hover {
                &::before {
                  content: '前往';
                  position: absolute;
                  bottom: 0;
                  display: inline-block;
                }
              }
            }
            .demo {
              &:hover {
                &::before {
                  content: '案例';
                  position: absolute;
                  bottom: 0;
                  display: inline-block;
                }
              }
            }
            .git {
              &:hover {
                &::before {
                  content: 'Github';
                  position: absolute;
                  bottom: 0;
                  display: inline-block;
                }
              }
            }
            .icon {
              margin: 6px;
              position: relative;
              cursor: pointer;
              &:hover {
                transform: scale(1.1);
              }
            }
          }
        }
        &:hover {
          .cover {
            opacity: 0;
            transform: translateY(50%);
          }
          .detail {
            opacity: 1;
            transform: scale(1);
          }
        }
      }
    }
  }
}
</style>
