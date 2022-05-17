<template>
  <div class="queue">
    <div v-if="!queueMusicList.length" class="empty">
      <icon icon="choose-music-empty" :size="128" class="icon" />
      <span class="tips">一首都没有、还不快来点</span>
    </div>
    <div v-else class="queue-content">
      <div v-for="(item, index) in queueMusicList" :key="index" class="music">
        <img :src="formatImg(item)" alt="item.name" class="music-pic" />
        <div class="music-info">
          <div class="music-info-name">{{ item.name }}</div>
          <div class="music-info-desc s-1-line">
            歌手：{{ item.artist }} 专辑:{{ item.album }}
          </div>
        </div>
        <div class="music-btn" @click="tips">
          <icon icon="queue-music-zan" :size="14" class="icon" />顶歌
        </div>
        <div class="music-btn" @click="removeQueueMusic(item)">
          <icon icon="queue-music-del" :size="14" class="icon" />移除
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/base/Icon'

export default {
  components: { Icon },
  props: {
    queueMusicList: {
      type: Array,
      default: () => []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    /* TODO 兼容下数据格式，爬虫页面和接口存的不一样 待优化 */
    formatImg(item) {
      const { pic, pic120 } = item
      return pic || pic120
    },
    tips() {
      this.$toast.info('正在加班加点开发ing')
    },
    removeQueueMusic(val) {
      this.$emit('removeQueueMusic', val)
    }
  }
}
</script>
<style lang="less" scoped>
.queue {
  padding: 10px 15px;
  .empty {
    margin-top: 30px;
    padding: 25px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .icon {
      margin-bottom: 20px;
    }
    .tips {
      user-select: none;
      color: #909399;
    }
  }
  &-content {
    height: 338px;
    overflow: hidden;
    overflow-y: auto;
    .music {
      display: flex;
      align-items: center;
      border-top: 1px solid #f5f5f5;
      padding: 10px 0;
      &-pic {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      &-info {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin-left: 8px;
        flex: 1;
        width: 0;
        &-name {
          font-size: 14px;
          color: #333;
        }
        &-desc {
          font-size: 12px;
        }
      }
      &-btn {
        user-select: none;
        padding: 5px 10px;
        margin: 0 2px;
        border-radius: 5px;
        cursor: pointer;
        color: #999;
        .icon {
          margin-right: 3px;
        }
        &:hover {
          background: #eee;
        }
        &:active {
          filter: brightness(1.2);
          color: #000;
        }
      }
    }
  }
}
</style>
