<template>
  <div>
    <header-bar></header-bar>
    <div style="height:calc(100vh - 88px);overflow:auto;">
      <keep-alive exclude="Video">
        <router-view />
      </keep-alive>
    </div>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
import HeaderBar from "@/components/HeaderBar.vue";
import TabBar from "@/components/TabBar.vue";

export default {
  components: {
    HeaderBar,
    TabBar
  }
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
