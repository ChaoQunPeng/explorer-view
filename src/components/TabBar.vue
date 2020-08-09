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
  data() {
    return {
      isHomePage: true,
    };
  },
  methods: {
    backward() {
      // 在首页的话就是目录地址变化，是其它页面的话自然是页面后退
      if (this.isHomePage) {
        this.$store.commit('backward');
      } else {
        this.$router.go(-1);
      }
    },
    openVideoList() {
      let videoList = this.$store.getters.videoList;

      if (!videoList.length) {
        alert(`此目录下没有视频文件哦~`);
        return;
      }

      this.$router.push({
        name: 'Video',
        params: {
          videoList: this.$store.getters.videoList,
        },
      });
    },
  },
  watch: {
    $route: function (route) {
      this.isHomePage = route.name == 'Home';
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