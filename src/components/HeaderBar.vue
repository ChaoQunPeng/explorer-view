<template>
  <div class="header-bar">
    <div class="header-bar-icon" @click="goHome">
      <i class="iconfont icon-home"></i>
    </div>
    <div class="header-bar-path">
      <ul class="header-bar-path-nav">
        <li @click="goHome">首页</li>
        <li v-for="(item,index) in dirObjList" :key="index" @click="goPath({...item,index:index})">
          <span>{{item.name}}</span>
          <!-- <i class="iconfont icon-arrow-right"></i> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getFileList } from '../api/index';

export default {
  name: 'HeaderBar',
  data() {
    return {
      dirObjList: this.$store.state.dirObjList,
    };
  },
  methods: {
    goHome() {
      this.$store.commit('goRoot');
    },
    // 点击导航栏跳转到指定路径
    goPath(item) {
      // this.$store.commit('goPath', item);
      // console.log(item);
      // console.log(this.$store.state.dirObjList);
    },
  },
  computed: {
    currentPath() {
      // 暂时还不知道这里为什么会是undefined
      if (this.$store.getters.currentPath != undefined) {
        // console.log(this.$store.state.paths);
      }

      if (this.$store.getters.currentPath == this.$store.state.diskRoot) {
        return '首页';
      } else {
        return this.$store.getters.currentPath;
      }
    },
  },
  watch: {
    // '$store.state.dirObjList': function (value) {
    //   getFileList(value.path)
    // },
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
    }
  }

  &-path {
    flex: 1;
    margin-left: 10px;
    margin-right: 5px;
    overflow: auto;
    height: 100%;
    display: flex;
    align-items: center;

    &-nav {
      white-space: nowrap;

      > li {
        display: inline-flex;
        margin-right: 5px;

        &::after {
          content: '>';
          margin-left: 5px;
        }

        &:last-child::after {
          content: none;
        }
      }
    }
  }
}
</style>