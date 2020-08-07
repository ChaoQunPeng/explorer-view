<template>
  <div class="header-bar">
    <div class="header-bar-icon" @click="goHome">
      <i class="iconfont icon-home"></i>
    </div>
    <div class="header-bar-path">
      <div class="header-bar-path-content">{{currentPath}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderBar',
  methods: {
    goHome() {
      this.$store.commit('goRoot');
    },
  },
  computed: {
    currentPath() {
      // 暂时还不知道这里为什么会是undefined
      if (this.$store.getters.currentPath != undefined) {
        console.log(this.$store.state.paths);
      }

      if (this.$store.getters.currentPath == this.$store.state.diskRoot) {
        return '首页';
      } else {
        return this.$store.getters.currentPath;
      }
    },
  },
};
</script>

<style scoped lang="less">
.header-bar {
  height: 44px;
  border-bottom: 1px solid #dfdfdf;
  display: flex;
  align-items: center;
  padding: 0 10px;

  &-icon {
    width: 30px;
    text-align: center;

    > i {
      font-size: 30px;
      color: #ddd;
    }
  }

  &-path {
    flex: 1;
    margin-left: 10px;
    margin-right: 5px;
    overflow: auto;

    // &-content {
    // }
  }
}
</style>