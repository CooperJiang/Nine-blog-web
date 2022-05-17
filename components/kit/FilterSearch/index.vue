<template>
  <div class="filter-select">
    <div class="filter-label">
      <icon :icon="icon" :size="22"></icon>
      <span>{{ title }}：</span>
    </div>
    <ul class="filter-options">
      <li
        v-for="(item, index) in options"
        :key="index"
        :class="{ 'options-checked': checkHasOwnValue(item, selectedArray) }"
        @click="handleSelect(item)"
      >
        {{ item[labelKey] }}
      </li>
    </ul>
  </div>
</template>

<script>
import Icon from '@/components/base/Icon'
export default {
  name: 'FilterSearch',
  components: {
    Icon
  },
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },
    options: {
      type: Array,
      default() {
        return []
      }
    },
    multiple: Boolean,
    icon: {
      type: String,
      default: () => 'home'
    },
    title: {
      type: String,
      default: () => ''
    },
    placeholder: {
      type: String,
      default: '不限'
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    valueKey: {
      type: String,
      default: 'value'
    }
  },
  data() {
    return {
      selectedArray: []
    }
  },
  computed: {
    selectedLabel() {
      if (this.selectedArray && this.selectedArray.length > 0) {
        return this.selectedArray.map((item) => item[this.labelKey]).join(',')
      }
      return this.placeholder
    },
    selectedValue() {
      return this.selectedArray.map((item) => item[this.valueKey])
    }
  },
  watch: {
    options() {
      this.initValue()
    },
    value() {
      this.initValue()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initValue()
    })
  },

  methods: {
    initValue() {
      const { value, options } = this
      if (value && value.length > 0 && options && options.length > 0) {
        const arr = value.map(t => Number(t))
        this.selectedArray = options.filter((item) => arr.includes(item[this.valueKey]))
      }
    },

    updateValue() {
      this.$emit('input', this.selectedValue)
      this.$emit('on-change', this.selectedValue)
    },

    handleSelect(option) {
      this.multiple
        ? this.handleSelectMultiple(option)
        : this.handleSelectSingle(option)
    },

    /* option 单选 */
    handleSelectSingle(option) {
      this.selectedArray = this.checkHasOwnValue(option, this.selectedArray)
        ? []
        : [option]
      this.updateValue()
    },

    /* option 多选 */
    handleSelectMultiple(option) {
      if (this.checkHasOwnValue(option, this.selectedArray)) {
        this.removeSomeValue(option, this.selectedArray)
      } else {
        this.selectedArray.push(option)
      }
      this.updateValue()
    },

    /**
     * @desc 判断 val 是否 在 values 中
     */
    checkHasOwnValue(val, values) {
      return (
        values &&
        values.some((item) => item[this.valueKey] === val[this.valueKey])
      )
    },

    /**
     * @desc 从 values 移除 val
     */
    removeSomeValue(val, values) {
      let rmIndex = -1
      values.forEach((item, index) => {
        if (item[this.valueKey] === val[this.valueKey]) {
          rmIndex = index
        }
      })
      if (rmIndex !== -1) {
        values.splice(rmIndex, 1)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.filter-select {
  margin-top: 12px;
  position: relative;
  display: flex;
  align-items: flex-start;
  .filter-label {
    flex: none;
    line-height: 28px;
    display: flex;
    align-items: center;
    color: @colorTextSub;
    span {
      margin-left: 6px;
    }
  }
  .filter-options {
    flex: 1;
    overflow: hidden;
    li {
      float: left;
      cursor: pointer;
      margin-left: 20px;
      padding: 0 10px;
      font-size: 14px;
      color: #4d555d;
      line-height: 28px;
      border-radius: 6px;
      margin-bottom: 12px;
      &.options-checked {
        background: @color;
        color: #fff;
        &:hover {
          background: @color;
          -webkit-text-fill-color: #fff;
          color: #fff;
        }
      }
      &:hover {
        @colorActive();
      }
    }
  }
}
</style>
