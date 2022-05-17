<template>
  <div
    class="to-top hidden-xs hidden-sm"
    :class="{ showBtn: isShowTopBtn }"
    @click="goToTop"
  >
    <img src="~/assets/images/top.png" />
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: () => 'top'
    }
  },
  data() {
    return {
      isShowTopBtn: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handlerScrool)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handlerScrool)
  },
  methods: {
    goToTop() {
      document.querySelector(`#${this.id}`).scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      })
    },
    handlerScrool() {
      if (document.documentElement.scrollTop > 150) {
        this.isShowTopBtn = true
      } else {
        this.isShowTopBtn = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
.to-top {
  position: fixed;
  bottom: -80px;
  right: -80px;
  z-index: 10;
  transition: all 0.5s ease-in;
  img {
    width: 35px;
    cursor: pointer;
    opacity: 0.8;
  }
  &:hover {
    transform: translateY(-15px);
  }
}
.showBtn {
  bottom: 2%;
  right: 2%;
}
</style>
