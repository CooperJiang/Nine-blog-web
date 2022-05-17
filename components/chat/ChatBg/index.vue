<template>
  <div id="mainBox" class="chat-bg">
    <!-- <video autoplay loop muted :src="currentBg" type="video/mp4" >
    </video> -->
    <!-- 暂时不加视频背景 性能问题 -->
    <div class="slot">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// const video1 = require("../../../assets/mp4/nine-video-01.mp4")
// const video2 = require("../../../assets/mp4/nine-video-02.mp4") //本地加载太慢了
export default {
  data() {
    return {
      canvas: null,
      videoBgList:['https://source-1300678944.cos.ap-shanghai.myqcloud.com/nine-video-01.mp4'],
      currentBg: 'https://source-1300678944.cos.ap-shanghai.myqcloud.com/nine-video-01.mp4' ,
      currentBgIndex: 0
    }
  },
  mounted() {
    // this.getCanvas()
    // document.getElementById('mainBox').style.backgroundImage =
    //   'url("' + this.canvas.toDataURL() + '")'
  },
  methods: {
    getCanvas() {
      ;(function () {
        'use strict'
        const vendors = ['webkit', 'moz']
        for (
          let i = 0;
          i < vendors.length && !window.requestAnimationFrame;
          ++i
        ) {
          const vp = vendors[i]
          window.requestAnimationFrame = window[vp + 'RequestAnimationFrame']
          window.cancelAnimationFrame =
            window[vp + 'CancelAnimationFrame'] ||
            window[vp + 'CancelRequestAnimationFrame']
        }
        if (
          /iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || // iOS6 is buggy
          !window.requestAnimationFrame ||
          !window.cancelAnimationFrame
        ) {
          let lastTime = 0
          window.requestAnimationFrame = function (callback) {
            const now = Date.now()
            const nextTime = Math.max(lastTime + 16, now)
            return setTimeout(function () {
              callback((lastTime = nextTime))
            }, nextTime - now)
          }
          window.cancelAnimationFrame = clearTimeout
        }
      })()

      const getRandomColor = function () {
        return '#' + ((Math.random() * 0xffffff) << 0).toString(16)
      }

      const canvas = document.getElementById('myCanvas')
      this.canvas = canvas
      const c = canvas.getContext('2d')
      const particles = {}
      let particleIndex = 0
      const particleNum = 0.2

      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      function Particle() {
        this.x = canvas.width / 2
        this.y = canvas.height / 2

        this.vx = Math.random() * 6 - 3
        this.vy = Math.random() * 4 - 2

        this.growth = (Math.abs(this.vx) + Math.abs(this.vy)) * 0.007

        particleIndex++
        particles[particleIndex] = this
        this.id = particleIndex
        this.size = Math.random() * 1
        this.color = getRandomColor()
      }

      Particle.prototype.draw = function () {
        this.x += this.vx
        this.y += this.vy

        this.size += this.growth
        if (this.x > canvas.width || this.y > canvas.height) {
          delete particles[this.id]
        }

        c.fillStyle = this.color
        c.beginPath()
        c.arc(this.x, this.y, this.size, 0 * Math.PI, 2 * Math.PI)
        c.fill()
      }

      function animate() {
        requestAnimationFrame(animate)
        c.fillStyle = '#000'
        c.fillRect(0, 0, canvas.width, canvas.height)
        if (Math.random() > particleNum) {
          new Particle()
        }
        for (const i in particles) {
          particles[i].draw()
        }
      }
      requestAnimationFrame(animate)
    },
    changeBg(){
      const max = this.videoBgList.length - 1
      const next = this.currentBgIndex + 1
      this.currentBgIndex = next > max ? 0 : next
      this.currentBg = this.videoBgList[this.currentBgIndex]
    }
  }
}
</script>
<style lang="less" scoped>
.chat-bg {
  position: fixed;
  top: 0;
  z-index: 0;
  height: 100vh;
  width: 100vw;
  background: url("https://jiangly.com/_nuxt/img/banner_111.a6be22c.gif");
  #myCanvas {
    position: absolute;
    z-index: 10;
  }
  .slot {
    position: absolute;
    z-index: 200;
  }
  video{
    position: fixed;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    object-fit:fill
  }
  source{
    width: 100vw;
    height: 100vh;
  }
}
</style>
