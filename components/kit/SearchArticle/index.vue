<template>
  <div class="search">
    <input
      v-model="inputVal"
      :placeholder="placeholder"
      class="search-input"
      type="text"
      autocomplete="off"
      @keyup.enter="handleEnter"
    />
    <button class="search-button" @click="handleSearch">
      <icon :size="20" class="search-button-icon" icon="search"></icon>
    </button>
  </div>
</template>

<script>
import Icon from '@/components/base/Icon'
export default {
  name: 'SearchArticle',
  components: {
    Icon
  },
  props: {
    placeholder: {
      type: String,
      default: '输入您想要搜索的内容！'
    }
  },
  data() {
    return {
      inputVal: ''
    }
  },
  mounted() {
    if (this.$route.query.keyword) {
      this.inputVal = this.$route.query.keyword
    }
  },
  methods: {
    handleEnter() {
      this.handleSearch()
    },
    handleSearch() {
      this.$emit('on-search', this.inputVal)
    },
    clear() {
      this.inputVal = null
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  position: relative;
  &-input {
    all: unset;
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 32px;
    padding: 0 40px 0 13px;
    font-size: 12px;
    color: @colorTextContent;
    border-radius: 100px;
    outline: 0;
    background-color: #fff;
    transition: width 0.3s ease;
  }
  &:focus-within &-input {
    box-shadow: 0 0 3px inset;
  }
  &-button {
    all: unset;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 40px;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    color: @colorTextSub;
    border: 0;
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;
    outline: 0;
    &-icon:hover {
      color: @colorTextTitle !important;
    }
  }
}
</style>
