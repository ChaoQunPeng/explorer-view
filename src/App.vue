<template>
  <div>
    <header-bar></header-bar>
    <div class="body" :class="{'video-body':isVideoPage}">
      <keep-alive exclude="Video">
        <router-view />
      </keep-alive>
    </div>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar.vue';
import TabBar from '@/components/TabBar.vue';

export default {
  data() {
    return {
      isVideoPage: false,
    };
  },
  components: {
    HeaderBar,
    TabBar,
  },
  watch: {
    $route: function (value) {
      this.isVideoPage = value.name == 'Video';
    },
  },
};
</script>

<style lang="less">
@import url('./assets/styles/index.less');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.body {
  height: calc(100vh - 124px);
  overflow: auto;
}

.video-body {
  overflow: hidden;
}

.icon {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
