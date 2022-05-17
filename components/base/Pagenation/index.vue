<template>
  <div v-if="showPagenation" class="page-bar">
    <ul>
      <li v-if="total">
        <a class="disabled" style="border: 0"
          >共<i>{{ total }}</i
          >条</a
        >
      </li>
      <li v-if="currentPage != 1">
        <a @click="pageChange(currentPage - 1)">上一页</a>
      </li>
      <li v-else><a class="disabled">上一页</a></li>
      <li
        v-for="index in indexs"
        :key="index"
        :class="{ active: currentPage == index }"
      >
        <a @click="pageChange(index)">{{ index }}</a>
      </li>
      <li v-if="currentPage != sumPage">
        <a @click="pageChange(currentPage + 1)">下一页</a>
      </li>
      <li v-else><a class="disabled">下一页</a></li>
      <li>
        <a class="to-end-page" @click="pageChange(sumPage)"
          >共<i>{{ sumPage }}</i
          >页</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Pagenation',
  props: {
    total: {
      type: Number,
      default: () => 0
    },
    pageSize: {
      type: Number,
      default: () => 10
    },
    currentPage: {
      type: Number,
      default: () => 1
    },
    hideOnSinglePage: {
      type: Boolean,
      default: () => false
    }
  },
  computed: {
    sumPage() {
      return Math.ceil(this.total / this.pageSize)
    },
    /* 只有一页或者没有的时候是否隐藏滚动条 */
    showPagenation() {
      return !(this.hideOnSinglePage && this.sumPage <= 1)
    },
    /* 取当前页数左右各x页 */
    indexs() {
      let left = 1
      let right = this.sumPage
      const ar = []
      if (this.sumPage >= 11) {
        if (this.currentPage > 5 && this.currentPage < this.sumPage - 4) {
          left = this.currentPage - 5
          right = this.currentPage + 4
        } else if (this.currentPage <= 5) {
          left = 1
          right = 10
        } else {
          right = this.sumPage
          left = this.sumPage - 9
        }
      }
      while (left <= right) {
        ar.push(left)
        left++
      }
      return ar
    }
  },
  methods: {
    pageChange(page) {
      if (page === this.currentPage) return
      this.$emit('pageChange', page)
    }
  }
}
</script>

<style lang="less" scoped>
.page-bar ul {
  text-align: center;
  font-size: 0;
  user-select: none;
}
.page-bar a {
  background: #fff;
  border: 1px solid @colorBorder;
  text-decoration: none;
  position: relative;
  float: left;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: @colorTextContent;
  cursor: pointer;
}
.page-bar .active a {
  color: #fff;
  cursor: default;
  background: linear-gradient(135deg, @colorAssist, @colorPrimary);
  background-color: @colorPrimary;
}
.page-bar a:hover {
  color: #fff;
  background: linear-gradient(135deg, @colorAssist, @colorPrimary);
  background-color: @colorPrimary;
}
.page-bar li {
  list-style: none;
  display: inline-block;
}
.page-bar li:first-child > a {
  margin-left: 0;
}

.page-bar a.disabled:hover {
  cursor: not-allowed;
  background: #fff;
  color: @colorTextContent;
}

.page-bar i {
  font-style: normal;
  color: @colorPrimary;
  margin: 0 4px;
}
.to-end-page {
  &:hover {
    i {
      color: #fff;
    }
  }
}
</style>
