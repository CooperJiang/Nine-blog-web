<template>
  <div class="chat-tips">
    <div class="tips">
      <span class="tips-lable">Tips: </span>
      <ul class="tips-content" :class="{ anim: animate == true }">
        <li v-for="(item, index) in tips" :key="index" class="item s-1-line">
          <span class="value">{{ item.msg }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      animate: false,
      tips: [
        { msg: '按下F1-F10有惊喜哟！...' },
        { msg: '想要隐藏自己的专属背景请按 ~ 键...'},
        { msg: '可以粘贴发送图片啦...' },
        { msg: '点击表情包可以搜索哟...' },
        { msg: '有bug欢迎反馈哟、看到就会改啦！' }
      ],
      timer: null
    }
  },
  created() {
    this.timer = setInterval(this.scroll, 6000)
  },
  mounted() {},
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    scroll() {
      this.animate = true
      setTimeout(() => {
        this.tips.push(this.tips[0])
        this.tips.shift()
        this.animate = false
      }, 5500)
    }
  }
}
</script>
<style lang="less" scoped>
.chat-tips {
  height: 100%;
  display: flex;
  align-items: center;
}
.tips {
  // width: 400px;
  height: 32px;
  overflow: hidden;
  padding-left: 30px;
  display: flex;
  align-items: center;
  &-lable {
    color: rgb(80, 78, 78);
    margin-right: 10px;
  }
  &-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .item {
      list-style: none;
      line-height: 30px;
      height: 30px;
      .value {
        color: #999;
      }
    }
  }
}
.anim {
  transition: all 0.5s;
  margin-top: -60px;
}
</style>
