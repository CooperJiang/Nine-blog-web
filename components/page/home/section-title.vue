<template>
  <div :class="['section-title', `section-title-${theme}`]">
    <div class="title">{{ title }}</div>
    <div v-if="decs" class="decs">{{ decs }}</div>
  </div>
</template>

<script>
export default {
  name: 'SectionTitle',
  props: {
    title: {
      type: String,
      default: () => ""
    },
    decs: {
      type: String,
      default: () => ""
    },
    theme: {
      type: String,
      default: 'dark'
    }
  }
}
</script>

<style lang="less" scoped>
.section-title {
  position: relative;
  margin-bottom: 50px;
  text-align: center;
  .title {
    font-size: 28px;
    font-weight: 500;
    color: @colorTextTitle;
  }
  .decs {
    margin-top: 10px;
    font-size: 18px;
    color: @colorTextTitle;
  }
  &-light {
    .title {
      color: #fff;
    }
    .decs {
      color: #fff;
    }
  }
}
</style>
