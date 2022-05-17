<template>
  <div class="queue">
    <div v-if="!musicList.length" class="empty">
      <icon icon="choose-music-empty" :size="128" class="icon" />
      <span class="tips">你的歌单空空如也呢</span>
    </div>
    <div v-else class="queue-content">
      <div v-for="(item, index) in musicList" :key="index" class="music">
        <img :src="item.pic" alt="item.name" class="music-pic" />
        <div class="music-info">
          <div class="music-info-name">{{ item.name }}</div>
          <div class="music-info-desc s-1-line">
            歌手：{{ item.artist }} 专辑:{{ item.album }}
          </div>
        </div>
        <div class="music-btn" @click="chooseMusic(item)">
          <icon icon="choose-music-play" :size="14" class="icon" />点歌
        </div>
        <div class="music-btn" @click="removeMusic(item)">
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
  data() {
    return {
      musicList: []
    }
  },
  computed: {},
  watch: {},
  created() {
    this.queryCollectMusic()
  },
  mounted() {},
  methods: {
    async queryCollectMusic() {
      this.musicList = await this.$API.music.collect()
    },
    chooseMusic(item) {
      this.$emit('chooseMusic', item)
    },
    async removeMusic(item) {
      const { mid } = item
      if (!mid) return
      await this.$API.music.remove({ mid })
      this.$toast.success('移除成功...')
      this.queryCollectMusic()
    },
    tips() {
      this.$toast.info('正在加班加点开发ing')
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
