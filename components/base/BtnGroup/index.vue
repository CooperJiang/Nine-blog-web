<template>
  <div class="z-btn-group clearfix">
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
.z-btn-group {
  display: inline-block;
  font-size: 0;
  line-height: 0;
  vertical-align: middle;
  .z-btn {
    &:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    &:last-child {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    &:not(:last-child) {
      margin-right: -1px;
    }
    &:not(:first-child):not(:last-child) {
      border-radius: 0;
    }


    &-primary,
    &-success,
    &-info,
    &-error,
    &-warning {
      &:first-child {
        border-right-color: hsla(0, 0%, 100%, 0.5);
      }
      &:last-child {
        border-left-color: hsla(0, 0%, 100%, 0.5);
      }
      &:not(:first-child):not(:last-child) {
        border-left-color: hsla(0, 0%, 100%, 0.5);
        border-right-color: hsla(0, 0%, 100%, 0.5);
      }
    }
  }
}
</style>
