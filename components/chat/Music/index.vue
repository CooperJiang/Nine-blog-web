<template>
  <div class="music">
    <audio
      v-if="src"
      ref="music"
      :src="src"
      autoplay
      @timeupdate="updateTime"
    ></audio>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: () => null
    },
    startTime: {
      type: Number,
      default: () => null
    },
    musicLrc: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    startTime(n, o) {
      this.specifiedTime(n)
    }
  },
  methods: {
    play() {
      console.log('被点击了');
      this.$refs.music.play()
    },
    pause() {
      this.$refs.music.pause()
    },
    specifiedTime(currentTime) {
      this.$nextTick(() => {
        if (this.$refs.music?.fastSeek) {
          this.$refs.music.fastSeek(currentTime)
        } else {
          this.$refs.music.currentTime = currentTime
          this.$refs.music.play()
        }
      })
    },
    /* 拿到当前时间，取出当前歌词 */
    updateTime(e) {
      const res = this.musicLrc.filter((t, i) => t.time < e.target.currentTime)
      let currentLrc = null
      res.length && (currentLrc = res[res.length - 1].lineLyric)
      this.$emit('updateLrc', {
        currentLrc,
        currentTime: parseInt(e.target.currentTime)
      })
    }
  }
}
</script>
