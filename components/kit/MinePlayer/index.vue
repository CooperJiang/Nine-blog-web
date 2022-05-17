<template>
    <div class="mine-video" :style="{ padding: `${padding}px`}">
      <div class="btn"  @click="handlerSetStatus">
        <icon :icon="icon" :size="28" class="icon" />
      </div>
      <div class="progress">
        <div class="bar" :style="{width: barWidth}"></div>
      </div>
      <audio ref="minePlayer" :src="src" :autoplay="autoplay" @timeupdate="updateTime"></audio>
    </div>
</template>

<script>
import Icon from '@/components/base/Icon'
export default {
  components: {Icon},
  props: {
    src: {
      type: String,
      default: () => ""
    },
    autoplay:{
      type: Boolean,
      default: () => true
    },
    padding: {
      type: Number,
      default: () => 8
    }
  },
  data() {
    return {
      isPlay: false,
      barWidth: 0
    };
  },
  computed: {
    icon() {
      return this.isPlay ? 'mine-player-pause' : 'mine-player-play';
    }
  },
  mounted() {
    this.$refs.minePlayer.addEventListener('ended', this.musicEnd)
    this.$refs.minePlayer.addEventListener('play', this.musicStart)
  },
  methods: {
    handlerSetStatus() {
      this.isPlay && this.$refs.minePlayer.pause()
      !this.isPlay && this.$refs.minePlayer.play()
      this.isPlay = !this.isPlay
      this.$refs.minePlayer.addEventListener('ended', this.musicEnd)
      this.$refs.minePlayer.addEventListener('play', this.musicStart)
    },
    musicStart(){
      this.isPlay = true
    },
    musicEnd(){
      this.barWidth = 0
      this.$refs.minePlayer.paused && (this.isPlay = false)
      this.$refs.minePlayer.removeEventListener('ended', this.musicEnd)
    },
    updateTime(e){
      const width = (e.target.currentTime / this.$refs.minePlayer.duration * 100 ).toFixed(2)
      this.barWidth = `${width}%`
    }
  }
}
</script>
<style lang='less' scoped>
.mine-video{
  width: 100%;
  background: #fff;
  padding: 8px;
  display: flex;
  .btn{
    width: 40px;
    transition: all .3s;
    cursor: pointer;
    &:hover{
      transform: scale(1.1);
      filter: brightness(1.2);
    }
    &:active{
      filter: brightness(.9);
    }
  }
  .progress{
    flex: 1;
    display: flex;
    align-items: center;
    .bar{
      height: 2px;
      background: #cdcdcd;
    }
  }
}
</style>
