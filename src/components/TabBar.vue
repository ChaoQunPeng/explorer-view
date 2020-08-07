<template>
  <div class="tabbar">
    <!-- <div class="tabbar-item" @click="goRoot">回到根目录</div> -->
    <div class="tabbar-item" @click="backward">点击返回上一级目录</div>
    <div class="tabbar-item" @click="openVideoList">在此打开VideoList</div>
  </div>
</template>

<script>
import { getFileList } from '../api/index';

export default {
  name: 'TabBar',
  methods: {
    goRoot() {
      this.requestData(this.$store.state.diskRoot, () => {
        this.$store.commit('goRoot');
      });
    },
    backward() {
      let lastPath = this.$store.state.paths[
        this.$store.state.paths.length - 2
      ];
      // 如果在根目录了，这个lastPath就是undefined
      if (!lastPath) return;
      getFileList(lastPath, () => {
        this.$store.commit('goBack');
      });
    },
    forward(path) {
      let forwardPath = path + '\\';
      getFileList(forwardPath, () => {
        this.$store.commit('pushPath', forwardPath);
      });
    },
    openVideoList() {
      this.$router.push({
        name: 'Video',
        params: {
          videoList: this.fileList,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.tabbar {
  display: flex;
  height: 44px;
  border-top: 1px solid #dfdfdf;

  &-item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>