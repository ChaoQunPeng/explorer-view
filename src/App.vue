<template>
  <div>
    <keep-alive exclude="Video">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  created() {},
  computed: {},
  methods: {}
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
