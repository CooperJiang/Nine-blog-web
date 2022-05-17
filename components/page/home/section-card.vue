<template>
  <div class="section-card">
    <div class="section-card-head">
      <icon class="icon" :size="24" :icon="icon" />
    </div>
    <div class="section-card-body">
      <p class="section-card-title">
        <span>{{ title }}</span>
      </p>
      <div class="section-card-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/base/Icon'
export default {
  name: 'SectionCard',
  components: { Icon },
  props: {
    title: {
      type: String,
      default: () => ''
    },
    icon: {
      type: String,
      default: () => 'like'
    },
    path: {
      type: String,
      default: '/'
    }
  }
}
</script>

<style lang="less" scoped>
.section-card {
  display: flex;
  align-items: flex-start;
  margin: 24px 0;
  position: relative;
  &:nth-child(1) {
    left: -86px;
  }
  &:nth-child(2) {
    left: -34px;
  }
  &:nth-child(3) {
    left: -18px;
  }
  &:nth-child(4) {
    left: -28px;
  }
  &:nth-child(5) {
    left: -72px;
  }
  &-head {
    flex: none;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 50%;
    background: @colorTextSilver;
    .icon {
      color: @colorTextSub;
      // @colorActive();
    }
  }
  &-body {
    margin-left: 20px;
    .section-card-title {
      display: inline-block;
      font-size: 16px;
      height: 20px;
      line-height: 20px;
      // @colorActive();
    }
    .section-card-content {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      height: 36px;
      line-height: 18px;
      font-size: 14px;
      color: @colorTextSub;
    }
  }
}
@media (min-width: @breakpoints-xs) and (max-width: @breakpoints-md) {
  .section-card {
    left: 0 !important;
  }
}
</style>
