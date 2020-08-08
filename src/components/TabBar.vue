<template>
  <div class="tabbar">
    <!-- <div class="tabbar-item" @click="goRoot">回到根目录</div> -->
    <div class="tabbar-item" @click="backward">
      <i class="iconfont icon-back"></i>
      返回
    </div>
    <div class="tabbar-item" @click="openVideoList">在此打开VideoList</div>
  </div>
</template>

<script>
import { getFileList } from '../api/index';

export default {
  name: 'TabBar',
  methods: {
    backward() {
      this.$store.commit('backward');
    },
    openVideoList() {
      this.$router.push({
        name: 'Video',
        params: {
          videoList: this.$store.state.dirList,
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