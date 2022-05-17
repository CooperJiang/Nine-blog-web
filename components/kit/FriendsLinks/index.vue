<template>
    <div class="s-container">
      <div v-for="(item, index) in links" :key="index" class="link s-col-xl-15 s-col-lg-20 s-col-md-30 s-col-sm-30 s-col-xs-60">
        <a :href="item.url" class="link_container" target="_blank">
          <img :src="item.avatar" :alt="item.desc" class="avatar">
          <div class="info">
            <div class="info_name">{{item.name}}</div>
            <div class="info_desc">{{item.desc}}</div>
          </div>
        </a>
      </div>
    </div>
</template>

<script>

export default {
  props:{
    links:{
      type: Array,
      default: () => []
    }
  },
}
</script>
<style lang='less' scoped>
.link{
  padding: 10px;
  &_container{
    display: flex;
    justify-content: center;
    background: #fff;
    border-radius: 5px;
    padding: 15px;
    height: 108px;
    transition: all .5s;
    position: relative;
    margin-bottom: 30px;
    &::before {
      content: '';
      background-color: #fff;
      height: 6px;
      margin-left: auto;
      margin-right: auto;
      position: absolute;
      left: 0.25rem;
      right: 0.5rem;
      bottom: -8px;
      border: 1px solid @colorBorder;
      border-top: none;
      box-shadow: 0 4px 8px 0 rgba(7, 17, 27, 0.1);
      z-index: 2;
    }
    &::after {
      content: '';
      background-color: #fff;
      height: 8px;
      margin-left: auto;
      margin-right: auto;
      position: absolute;
      bottom: -16px;
      left: 0.5rem;
      right: 0.25rem;
      border: 1px solid @colorBorder;
      border-top: none;
      box-shadow: 0 4px 8px 0 rgba(7, 17, 27, 0.1);
      z-index: 1;
    }
    .avatar{
      width: 60px;
      height: 60px;
      border-radius: 50%;
      transition: all .5s;
    }
    .info{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 10px;
      &_name{
        height: 30px;
        font-size: 18px;
        font-weight: 700;
        color: #3c4858;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &_desc{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-bottom: 5px;
        color: #718096;
        font-size: 14px;
      }
    }
    &:hover{
      transform: translateY(10px);
      box-shadow: 0 4px 8px 0 rgba(7, 17, 27, 0.1);
      .avatar{
        transform: scale(1.1);
      }
      .info_name{
        color: #80b963;
      }
    }
  }
}
</style>
