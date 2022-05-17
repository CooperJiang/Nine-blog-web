<template>
  <div class="tag" :style="{ background: color }">
    <div class="tag-container">
      <div
        v-for="(item, index) in aboutMeList"
        :key="index"
        class="contact"
        :style="{ borderColor: item.color }"
      >
        <div class="contact-left">
          <Icon :icon='item.icon' class="icon" :size='20' />
          <span class="contact-left-number" @click="open(item, index)">
            {{ item.msg }}
          </span>
        </div>
        <div class="contact-right" :style="{ background: item.color }">
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/base/Icon'
export default {
  components: { Icon },
  props: {
    color: {
      type: String,
      default: () => 'transparent'
    }
  },
  data() {
    return {
      aboutMeList: [
        // {
        //   title: 'QQ群',
        //   number: '999999999',
        //   color: '#eb6841',
        //   icon: 'qq-group'
        // },
        { title: 'QQ号', number: '927898639', color: '#5aa98f', msg: "927898639", icon: "qq" },
        {
          title: 'Email号',
          content: 'J_longyan@163.com',
          color: '#51a0e2',
          msg: "J_longyan@163.com", 
          icon: "email" 
        },
        {
          title: 'Github',
          content: 'https://github.com/longyanjiang',
          color: '#000000',
          msg: "github.com/longyanjiang", 
          icon: "github" 
        },
        {
          title: 'Gitee',
          content: 'https://gitee.com/jlongyan',
          color: '#c83838',
          msg: "gitee.com/jlongyan", 
          icon: "gitee" 
        },
        {
          title: '掘金',
          content: 'https://juejin.cn/user/3861140568811576',
          color: '#4b80fc',
          msg: "juejin.cn/user/3861140568811576", 
          icon: "juejin" 
        }
      ]
    }
  },
  methods: {
    open(item, index) {
      const { content } = item
      index > 1 && window.open(content)
    }
  }
}
</script>
<style lang="less" scoped>
.tag {
  h3 {
    position: relative;
    cursor: pointer;
    font-weight: 500;
    border-bottom: 2px solid #e8e8e8;
    &::before {
      content: '';
      width: 12%;
      height: 2px;
      position: absolute;
      left: 0;
      bottom: -1px;
      background: #000;
      transition: all 0.7s;
    }
    &:hover {
      &::before {
        width: 25%;
        transition: all 0.7s ease-in;
      }
    }
  }
  &-container {
    display: flex;
    flex-direction: column;
    .contact {
      margin-bottom: 10px;
      // background: #fff;
      display: flex;
      align-items: center;
      height: 40px;
      border: 1px solid transparent;
      color: #525252;
      font-size: 14px;
      transition: all 0.5s;

      &-left {
        width: calc( 100% - 60px);
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        .icon {
          margin: 0 5px;
        }
        &-number {
          cursor: pointer;
          &:hover {
            color: #00a7eb;
          }
        }
      }
      &-right {
        width: 60px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.5s;
        color: #fff;
      }
      &:hover {
        .contact-right {
          width: 80px;
        }
      }
    }
  }
}
</style>
