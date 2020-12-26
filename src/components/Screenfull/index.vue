<template>
  <div>
<!--    <svg-icon :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'" @click="handleClick" />-->
    <i class="el-icon-full-screen" style="transform: scale(1.1)"  @click="handleClick" ></i>
  </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
  name: 'Screenfull',
  data() {
    return {
      isFullscreen: false
    }
  },
  mounted() {
    this.init()
  },
  beforeUnmount() {
    this.destroy()
  },
  methods: {
    handleClick() {
      if (screenfull.enabled) {
        this.$message({
          message: '您的浏览器无法使用',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen
    },
    init() {
      if (screenfull.enabled) {
        screenfull.on('change', this.change)
      }
    },
    destroy() {
      if (screenfull.enabled) {
        screenfull.off('change', this.change)
      }
    }
  }
}
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
