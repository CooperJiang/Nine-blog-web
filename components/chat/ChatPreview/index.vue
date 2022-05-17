<template>
<transition name="fade" mode="out-in">
    <div v-if="show" class="preview" @click.stop="bodyClose">
      <div class="preview-container">
          <div class="header">
            <span v-if="mode === 'sendImg'" >确定发送此图片么？</span>
            <span></span>
            <span @click="close" >
              <icon icon="close" class="icon" />
            </span>
          </div>
          <div class="content">
            <img :src="preBase" alt="">
          </div>
          <div v-if="mode === 'sendImg'" class="footer" >
            <div class="btn" @click="sendImage">确认发送</div>
          </div>
        </div>
    </div>
</transition>
</template>

<script>
import Icon from '@/components/base/Icon'

export default {
  components: {Icon},
  props:{
    mode:{
      type: String,
      default: () => "sendImg"
    },
    lockModal: {
      type: Boolean,
      default: () => true
    }
  },
  data() {
    return {
      show: false,
      preBase: null,
      file: null
    };
  },
  methods: {
    open(preBase,file){
      this.preBase = preBase
      this.file = file
      this.show = true
    },
    close(){
      this.show = false
    },
    bodyClose(){
      if(this.lockModal) return
      this.show = false
    },
    sendImage(){
      this.$emit("sendImage",this.file)
      this.show = false
    }
  },
}
</script>
<style lang='less' scoped>
.preview{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, .6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  /* stylelint-disable */
  font-family: "webfont";
  &-container{
    padding: 10px 15px;
    background: #fff;
    border: 1px solid #fff;
    border-radius: 5px;
    .header{
      color: #303133;
      font-size: 18px;
      font-weight: 600;
      display: flex;
      justify-content: space-between;
      .icon{
        cursor: pointer;
      }
    }
    .content{
      padding: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        max-width: 60%;
        max-height: 80%;
      }
    }
    .footer{
      display: flex;
      justify-content: flex-end;
      .btn{
        padding: 4px 15px;
        border-radius: 3px;
        background: #409eff;
        color: #fff;
        font-weight: 500;
        user-select: none;
          cursor: pointer;
        &:hover{
          filter: brightness(.8);
        }
        &:active{
          filter: brightness(1.1);
        }
      }
    }
  }
}
</style>
