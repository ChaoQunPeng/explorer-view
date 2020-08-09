<template>
  <div class="header-bar" style="padding-left:0;">
    <div class="header-bar-icon" :class="{'shadow':showShadow}" @click="goHome">
      <i class="iconfont icon-home"></i>
    </div>
    <div class="header-bar-path" ref="headerBarPath">
      <ul class="header-bar-path-nav">
        <li v-for="(item,index) in dirList" :key="index" @click="goDir({...item,index})">
          <span>{{item.name}}</span>
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
      this.$router
        .push({
          name: 'Home',
        })
        .catch((err) => err);
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
  height: 62px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  background: #192a56;
  color: #fff;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;

  &-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 100%;
    transition: all 0.3s;

    > .iconfont {
      font-size: 24px;
      transition: all 0.3s;

      &:active {
        text-shadow: 0 0 10px #fff;
      }
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
        transition: all 0.3s;

        &:active {
          background: #fff;
          color: #192a56;
          border-radius: 2px;
          padding: 0 4px;
        }

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