<template>
  <div class="tabbar">
    <!-- <div class="tabbar-item" @click="goRoot">回到根目录</div> -->
    <div class="tabbar-item" @click="backward">
      <i class="iconfont icon-left"></i>
    </div>
    <div class="tabbar-item" @click="openVideoList">
      <i class="iconfont icon-player"></i>
    </div>
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
  height: 62px;
  background: #192a56;
  color: #fff;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;

  &-item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s;

    &:active {
      background: #fff;
      color: #192a56;
    }

    > .iconfont {
      font-size: 24px;
    }
  }
}
</style>