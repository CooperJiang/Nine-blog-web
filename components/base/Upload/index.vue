<template>
  <div class="upload" :style="{ width, height, color }">
    <input
      :id="id"
      type="file"
      :multiple="multiple"
      :accept="accept"
      @change="tirggerFileAll($event)"
    />
    <icon v-if="!url" icon="upload-empty" :size="68" />
    <img v-else :src="url" />
  </div>
</template>

<script>
import axios from 'axios'
import Config from '../../../configs/clientConfig'
import Icon from '@/components/base/Icon'

export default {
  components: { Icon },
  props: {
    action: {
      type: String,
      default: () => Config.uploadURL
    },
    id: {
      type: String,
      default: () => 'uploadInput'
    },
    url: {
      type: String,
      default: () => null
    },
    accept: {
      type: String,
      default: () => 'image/*'
    },
    multiple: {
      type: Boolean,
      default: () => false
    },
    fileKey: {
      type: String,
      default: () => 'file'
    },
    width: {
      type: String,
      default: () => '100px'
    },
    height: {
      type: String,
      default: () => '100px'
    },
    color: {
      type: String,
      default: () => '#cfcfcf'
    },
    success: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    proxyClick() {
      document.getElementById(this.id).click()
    },
    tirggerFileAll(e) {
      const files = e.target.files
      this.uploadFile(files[0])
    },
    async uploadFile(file) {
      const formData = new FormData()
      formData.append(this.fileKey, file)
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      const res = await axios.post(this.action, formData, config)
      this.success(res.data)
    }
  }
}
</script>
<style lang="less" scoped>
.upload {
  border: 1px solid #ddd8d8;
  cursor: pointer;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  input{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
}
</style>
