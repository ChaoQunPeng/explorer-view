<template>
  <div class="image">
    <img class="image" :src="picture.path" :alt="picture.name" />
  </div>
</template>


<script>
export default {
  name: 'Picture',
  data() {
    return {
      picture: {},
    };
  },
  props: {
    // imageFile: {
    //   type: Object,
    // },
  },
  created() {
    this.picture = this.$route.params.picture;
    this.picture.path = this.$convertAccessPath(this.picture.path);
  },
};
</script>

<style lang="less" scoped>
.image {
  display: block;
  width: 100%;
}
</style>