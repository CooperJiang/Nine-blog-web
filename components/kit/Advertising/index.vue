<template>
  <div class="persion">
    <div class="persion-title">领取外卖大额优惠券</div>
    <div class="persion-img">
      <img src="../../../assets/images/gzh.jpg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  components: {}
}
</script>
<style lang="less">
.persion {
  width: 100%;
  display: flex;
  flex-direction: column;
  &-title {
    font-weight: 500;
  }
  &-img {
    width: 100%;
    img {
      width: 100%;
    }
  }
}
</style>
