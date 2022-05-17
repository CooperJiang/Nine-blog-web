<template>
  <div id="top" class="app-wrapper">
    <app-header />
    <div class="app-wrapper-content">
      <slot></slot>
    </div>
    <app-footer />
    <sign-in />
    <sign-up />
    <top />
  </div>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter'
import SignIn from '@/components/kit/SignIn'
import SignUp from '@/components/kit/SignUp'
import Top from '@/components/base/Top'
export default {
  components: { AppHeader, AppFooter, SignIn, SignUp, Top },
  data() {
    return {}
  }
}
</script>
<style lang="less">
.app-wrapper-content {
  padding-top: @heightHeader + 20;
  padding-bottom: @heightFooter + 20;
  margin-bottom: -@heightFooter;
  // min-height: 100%;
  // min-height: calc(100vh - 320px);
  min-height: 100vh;
}
.app-wrapper {
  background: url(https://file.jiangly.com/images/34207572.jpg) !important;
}
</style>
