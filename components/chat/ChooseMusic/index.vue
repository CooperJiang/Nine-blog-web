<template>
  <div v-loading="loading" class="choose">
    <div class="choose-header">
      <input
        ref="input"
        v-model="params.keyword"
        type="text"
        placeholder="歌手/歌名/专辑搜索..."
        @keydown.enter="search"
      />
      <div class="choose-header-btn" @click="search">
        <icon icon="search" />
        搜索
      </div>
    </div>
    <div class="choose-content">
      <div v-if="!isShowMusic" class="choose-content-empty" @click="focus">
        <icon icon="choose-music-empty" :size="128" class="icon" />
        <span class="tips">请输入关键词搜索歌曲</span>
      </div>

      <div v-if="isShowMusic" class="choose-content-music">
        <div v-for="(item, index) in musicList" :key="index" class="music">
          <img v-if="item.pic120" :src="item.pic120" alt="item.name" class="music-pic" />
          <img v-if="item.pic" :src="item.pic" alt="item.name" class="music-pic" />
          <div class="music-info">
            <div class="music-info-name">{{ item.name }}</div>
            <div class="music-info-desc s-1-line">
              歌手：{{ item.artist }} 专辑:{{ item.album }}
            </div>
          </div>
          <div class="music-btn" @click="chooseMusic(item)">
            <icon
              icon="choose-music-play"
              :size="14"
              class="icon"
            />点歌
          </div>
          <div class="music-btn" @click="loveMusic(item)">
            <icon icon="choose-music-love" :size="14" class="icon" />收藏
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/base/Icon'

export default {
  components: { Icon },
  data() {
    return {
      isShowMusic: false,
      musicList: [],
      loading: false,
      params: {
        page: 1,
        pagesize: 30,
        keyword: '',
      },
    }
  },
  mounted() {
    this.focus()
  },
  created(){
    this.queryHotMusic()
  },
  methods: {
    focus() {
      this.$refs.input.focus()
    },
    async search() {
      if(!this.params.keyword) return
      this.loading = true
      const res = await this.$API.music.search(this.params)
      this.loading = false
      this.musicList = res
      this.isShowMusic = true
    },
    chooseMusic(item){
      this.$emit('chooseMusic',item)
    },
    loveMusic(item){
      const { album, artist, mid, pic120: pic, name}  = item
      this.$emit('loveMusic',{ album, artist, mid, pic, name})
    },
    async queryHotMusic(){
      const res = await this.$API.music.hot()
      this.isShowMusic = true
      this.musicList = res
    }
  },
}
</script>
<style lang='less' scoped>
.choose {
  padding: 0 15px;
  border-top: 1px solid #eee;
  &-header {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #e5e5e5;
    transition: all 0.3s;
    font-size: 13px;
    color: #999;
    border-radius: 5px;
    margin: 7px 0;
    input {
      padding: 8px 16px;
      flex: 1;
      font-size: 13px;
      outline: none;
      border: none;
      color: #999;
      background: transparent;
      &::placeholder {
        color: #ccc;
        font-size: 14px;
      }
    }
    &-btn {
      padding: 9px 18px;
      border-left: 1px solid #e5e5e5;
      user-select: none;
      &:hover {
        filter: brightness(0.8);
        border-left: 1px solid transparent;
      }
      &:active {
        filter: brightness(1.2);
      }
    }
  }

  &-content {
    height: 275px;
    user-select: none;
    overflow: hidden;
    overflow-y: auto;
    &-empty {
      padding: 25px 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .icon {
        margin-bottom: 20px;
      }
      .tips {
        user-select: none;
        color: #909399;
      }
    }
    .music {
      display: flex;
      align-items: center;
      border-top: 1px solid #f5f5f5;
      padding: 10px 0;
      &-pic {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      &-info {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin-left: 8px;
        flex: 1;
        width: 0;
        &-name {
          font-size: 14px;
          color: #333;
        }
        &-desc {
          font-size: 12px;
        }
      }
      &-btn {
        user-select: none;
        padding: 5px 10px;
        margin: 0 2px;
        border-radius: 5px;
        cursor: pointer;
        color: #999;
        .icon {
          margin-right: 3px;
        }
        &:hover {
          background: #eee;
        }
        &:active {
          filter: brightness(1.2);
          color: #000;
        }
      }
    }
  }
}
</style>
