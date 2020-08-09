<template>
  <div class="txt"></div>
</template>


<script>
export default {
  name: 'Txt',
  data() {
    return {
      txt: {},
    };
  },
  created() {
    this.txt = this.$route.params.txt;
    this.txt.path = this.$convertAccessPath(this.txt.path);
    fetch(this.txt.path)
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        console.log(res);
      });
  },
};
</script>

<style lang="less" scoped>
.txt {
}
</style>