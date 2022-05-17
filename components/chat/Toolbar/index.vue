<template>
  <div class="toolbar">
    <ChatBox :options="options1">
      <chat-emoticon
        @emotion="
          (emoji) => {
            $emit('emotion', emoji)
          }
        "
        @sendEmoji="
          (val) => {
            $emit('sendEmoji', val)
          }
        "
      />
    </ChatBox>
    <ChatBox :options="options2">
      <choose-music
        @loveMusic="loveMusic"
        @chooseMusic="(val) => $emit('chooseMusic', val)"
      />
    </ChatBox>
    <ChatBox :options="options3">
      <queue-music
        :queue-music-list="queueMusicList"
        @removeQueueMusic="removeQueueMusic"
      />
    </ChatBox>
    <ChatBox :options="options4">
      <collect-music @chooseMusic="(val) => $emit('chooseMusic', val)" />
    </ChatBox>

    <div class="toolbar-left" @click.stop>
      <span class="toolbar-left-item" @click="openBox(1)">
        <icon icon="toolbar-pic" class="icon" :size="14" />表情
      </span>
      <span class="toolbar-left-item" @click="openBox(2)">
        <icon icon="toolbar-choose-music" class="icon" :size="14" />点歌
      </span>
      <span class="toolbar-left-item" @click="openBox(3)">
        <icon icon="toolbar-hook" class="icon" :size="14" />已点{{ queueNums }}
      </span>
      <span class="toolbar-left-item" @click="openBox(4)">
        <icon icon="toolbar-love" class="icon" :size="14" />歌单
      </span>
    </div>
    <div v-if="musicInfo" class="toolbar-right s-1-line">
      <Icon icon="chat-music" :size="15" />
      {{ `${musicInfo.album} - ${musicInfo.artist}` }}
      <span class="icon collection" @click="collectMusic">
        <Icon icon="chat-collection" :size="18" />
      </span>
      <span class="icon switch" @click="cutMusic">
        <Icon icon="chat-switch" :size="18" />
      </span>
    </div>

    <div class="toolbar-progress">
      <div
        :style="{ width: `${progess}%` }"
        class="toolbar-progress-line"
      ></div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/base/Icon'
import ChatBox from '@/components/chat/ChatBox/index.vue'
import ChooseMusic from '@/components/chat/ChooseMusic/index.vue'
import CollectMusic from '@/components/chat/CollectMusic/index.vue'
import QueueMusic from '@/components/chat/QueueMusic/index.vue'
import ChatEmoticon from '@/components/chat/ChatEmoticon/index.vue'

export default {
  components: {
    ChatBox,
    Icon,
    ChatEmoticon,
    ChooseMusic,
    CollectMusic,
    QueueMusic
  },
  props: {
    musicInfo: {
      type: Object,
      default: () => {}
    },
    queueMusicList: {
      type: Array,
      default: () => []
    },
    currentTime: {
      type: Number,
      default: () => 0
    },
    startTime: {
      type: Number,
      default: () => 0
    }
  },
  data() {
    return {
      options1: {
        width: 500,
        height: 400,
        show: false,
        top: -415,
        left: 10,
        title: '表情包'
      },
      options2: {
        width: 500,
        height: 400,
        show: false,
        top: -415,
        left: 10,
        title: '点歌台'
      },
      options3: {
        width: 500,
        height: 400,
        show: false,
        top: -415,
        left: 10,
        title: '正在等待播放的歌曲'
      },
      options4: {
        width: 500,
        height: 400,
        show: false,
        top: -415,
        left: 10,
        title: '我的收藏歌单'
      }
      // width: 0,
      // timer: null
    }
  },
  computed: {
    queueNums() {
      return this.queueMusicList.length
        ? `[${this.queueMusicList.length}]`
        : null
    },
    progess() {
      if (!this.currentTime || !this.musicInfo) return
      const { duration } = this.musicInfo
      const width = (
        (Number(this.currentTime) / Number(duration)) *
        100
      ).toFixed(2)
      return width > 100 ? 100 : width
    }
  },
  watch: {
    // musicInfo() {
    //   clearInterval(this.timer)
    //   this.compilerWidth()
    // }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    openBox(val) {
      if(this[`options${val}`].show) return this[`options${val}`].show=false
      this.closeBox()
      this[`options${val}`].show = !this[`options${val}`].show
    },
    closeBox() {
      const self = this
      const keys = Object.keys(self._data).filter( t => t.search('option' !== -1))
      keys.forEach((t) => (self[t].show = false))
    },
    /**
     * @desc 在本页面可以点按钮收藏，点歌台的收藏也会传递到这里，区分有没有参数有的就是点歌台的
     */
    collectMusic(val) {
      const { album, artist, mid, pic } = this.musicInfo
      /* 加name是因为爬虫爬页面少怕了这个字段补全一下，默认和专辑名称一样就好 */
      this.$emit('collectMusic', {
        album,
        artist,
        mid,
        pic,
        ...{ name: album }
      })
    },
    loveMusic(val) {
      this.$emit('collectMusic', val)
    },
    cutMusic() {
      this.$emit('cutMusic')
    },
    /**
     * @desc 通过currentTime改变进度条会导致卡顿
     * 1.可以拿到歌曲开始时间，计算剩余长度剩余时间，就可以计算每60s移动宽度，
     * 2.目前看会有差异，待优化
     */
    compilerWidth() {
      this.width = 0
      const { duration } = this.musicInfo
      const totalTime = Number(duration)
      const remainingTime = totalTime - this.startTime
      this.width = Number(((this.startTime / totalTime) * 100).toFixed(2))
      const t = ((100 - this.width) / remainingTime / 1000) * 60
      this.timer = setInterval(() => {
        this.width += Number(t)
      }, 60)
    },
    removeQueueMusic(val) {
      this.$emit('removeQueueMusic', val)
    }
  }
}
</script>
<style lang="less" scoped>
.toolbar {
  position: relative;
  padding: 10px;
  color: #999;
  @media screen and (max-width: 720px) {
    .toolbar-right {
      top: -25px !important;
    }
  }
  &-left {
    &-item {
      user-select: none;
      cursor: pointer;
      padding: 5px 10px;
      border-radius: 5px;
      transition: all 0.3s;
      font-size: 13px;
      /* stylelint-disable */
      font-family: 'webfont';
      font-weight: 500;
      .icon {
        margin-right: 3px;
      }
      &:hover {
        background: #eee;
      }
    }
  }
  &-right {
    position: absolute;
    right: 10px;
    top: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    .icon {
      margin-left: 5px;
    }
    .collection :hover {
      color: #409eff;
    }
    .switch :hover {
      color: #ff4500;
    }
  }
  &-progress {
    height: 2px;
    background: #eee;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    &-line {
      height: 100%;
      background: linear-gradient(270deg, #4493d7, #fff);
    }
  }
}
</style>
