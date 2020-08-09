<template>
  <div class="header-bar" style="padding-left:0;">
    <div class="header-bar-icon" :class="{'shadow':showShadow}" @click="goHome">
      <i class="iconfont icon-home"></i>
    </div>
    <div class="header-bar-path" ref="headerBarPath">
      <ul class="header-bar-path-nav">
        <!-- <li @click="goHome">首页</li> -->
        <li v-for="(item,index) in dirList" :key="index" @click="goDir({...item,index})">
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
      dirList: this.$store.state.dirList,
      showShadow: false,
    };
  },
  mounted() {
    this.$refs.headerBarPath.addEventListener('scroll', (event) => {
      this.showShadow = event.target.scrollLeft > 0;
    });
  },
  methods: {
    goHome() {
      this.$store.commit('goRoot');
    },
    // 点击导航栏跳转到指定路径
    goDir(item) {
      let newDirList = this.dirList.splice(0, item.index + 1);
      this.$store.commit('goDir', newDirList);
    },
  },
  watch: {
    '$store.state.dirList': function (dirList) {
      this.dirList = dirList;
    },
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
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 100%;
    transition: all .3s;

    > i {
      font-size: 30px;
    }

    &.shadow {
      box-shadow: 2px 0 5px #ddd;
    }
  }

  &-path {
    flex: 1;
    margin-left: 5px;
    // margin-right: 5px;
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