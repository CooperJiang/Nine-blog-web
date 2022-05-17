<template>
  <ul class="md-anchor-nav">
    <li v-for="(nav, index) in list" :key="index">
      <a
        :id="nav.index | anchor"
        :class="{ active: highLightIndex === nav.index }"
        href="javascript:;"
        @click="scrollToEle(nav.index)"
      >
        <span>{{ nav.title }}</span>
      </a>
      <md-nav-anchor
        v-if="nav.children.length > 0"
        :list="nav.children"
        :offset-top-list="offsetTopList"
      />
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MdNavAnchor',
  filters: {
    anchor(value) {
      return `#titleAnchor-${value}`
    }
  },
  props: {
    list: {
      type: Array,
      required: true,
      default() {
        return []
      }
    },
    offsetTopList: {
      type: Array,
      required: true,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      idPrefix: 'titleAnchor-'
    }
  },
  computed: {
    ...mapGetters({ highLightIndex: 'highLightIndex' })
  },
  methods: {
    scrollToEle(eleIndex) {
      const targetOffsetTop = this.offsetTopList[eleIndex]
      // window.scrollTo(0, targetOffsetTop - 100);
      this.scrollMove(targetOffsetTop - 84, 60)
    },
    scrollMove(scrollTo, frames) {
      const scrollFrom = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let count = 0
      const fn = () => {
        count++
        document.documentElement.scrollTop = document.body.scrollTop =((scrollTo - scrollFrom) / frames) * count + scrollFrom
        if(count < frames) requestAnimationFrame(fn)
      }
      requestAnimationFrame(fn)
    }
  }
}
</script>
<style lang="less" scoped>
.md-anchor-nav {
  position: relative;
  z-index: 10;
  margin-left: 15px;
  list-style: square;
  padding-left: 10px;
}

.md-anchor-nav a {
  display: block;
  padding: 5px 0;
  line-height: 1.5;
  color: @colorTextContent;

  &:link,
  &:visited {
    text-decoration: none;
  }

  &:hover span {
    color: @colorSuccess;
    @colorActive();

    text-decoration: underline;
  }

  &.active span {
    color: @colorSuccess;
    @colorActive();
  }
}
</style>
