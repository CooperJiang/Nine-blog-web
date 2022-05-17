<template>
  <div class="online">
    <div v-for="(item, index) in onLineUser" :key="index" class="online-item">
      <img class="online-item-avatar" :src="item.avatar" />
      <div class="online-item-info">
        <div class="online-item-info-name">
          <span>{{ item.nickname }}</span>
          <span
            v-if="['guest','super','admin'].includes(item.role)"
            class="role"
            :style="{ backgroundColor: roleBg(item.role) }"
          >
            {{roleMap[item.role]}}
          </span>
        </div>
        <div class="online-item-info-desc s-1-line">
          {{item.sign}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'OnLineInfo',
  props: {
    onLineUser: {
      type: Array,
      default: () => []
    }
  },
  data(){
    return {
      roleMap: {
        admin: "房主",
        guest: "嘉宾",
        super: "超管"
      },
      roleBgMap: {
        admin: "#000",
        guest: "#701ec9",
        super: "#3785df"
      }
    }
  },
  computed: {
    roleBg() {
      return function (role) {
        return this.roleBgMap[role]
      }
    }
  }
}
</script>
<style lang="less" scoped>
.online {
  display: flex;
  flex-direction: column;
  height: 440px;
  overflow: hidden;
  overflow-y: auto;
  &-item {
    cursor: pointer;
    padding: 10px;
    display: flex;
    align-items: center;
    border-top: 1px solid #f5f5f5;
    transition: all 0.3s;
    border-left: 3px solid transparent;
    padding-left: 8px;
    position: relative;
    &:hover {
      border-left: 3px solid #1295dd;
    }
    &-avatar {
      width: 40px;
      height: 40px;
      border-radius: 5px;
      margin-right: 10px;
    }
    &-info {
      display: flex;
      flex-direction: column;
      flex: 1;
      width: 0;
      &-name {
        font-size: 14px;
        color: #000;
        font-weight: 500;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .role {
          background-color: #ccc;
          font-size: 12px;
          color: #fff;
          padding: 1px 10px;
          margin-right: 3px;
          border-radius: 3px;
        }
      }
      &-desc {
        font-size: 12px;
        margin-top: 8px;
        color: #aaa;
      }
    }
  }
}
</style>
