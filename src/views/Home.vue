<template>
  <div>
    <ul class="ev-file-list" style="list-style:none;">
      <li v-for="(item,index) in list" :key="index" @click="clickItem(item)">
        <div class="ev-file-item">
          <div class="icon">
            <i class="iconfont" :class="[item.type=='file'?'icon-file':'icon-folder']"></i>
          </div>
          <div class="content">
            {{item.name}}
            <!-- <div class="content-txt"></div> -->
          </div>
        </div>
      </li>

      <li class="no-data-tip" v-if="!list.length">什~么~都~没~有~哦~</li>
    </ul>
  </div>
</template>

<script>
import { getFileList } from '../api/index';

export default {
  name: 'List',
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const path = this.$store.state.diskRoot;
      getFileList(path, () => {
        this.$store.commit('forward', {
          name: '主页',
          path,
        });
      }).then((list) => {
        this.list = list;
      });
    },
    clickItem(file) {
      if (file.type == 'dir') {
        this.forward(file);
      } else {
        this.openMedia(file);
      }
    },
    forward(file) {
      file.path = file.path + '\\';
      getFileList(file.path, () => {
        this.$store.commit('forward', file);
      });
    },
    openMedia(file) {
      const ext = file.ext;
      switch (ext) {
        case 'mp4':
        case 'avi':
        case 'rmvb':
        case 'mkv':
          this.$router.push({
            name: 'Video',
            params: {
              videoList: [file],
            },
          });
          break;
        default:
          alert(`
            当前文件：${file.path}，尚未有合适的组件展示
          `);
          break;
      }
    },
  },
  watch: {
    '$store.state.dirList': function (dirList) {
      let currentPath =
        dirList.length <= 1
          ? dirList[0].path
          : dirList[dirList.length - 1].path;

      getFileList(currentPath).then((list) => {
        this.list = list;
        this.$store.commit('setList', list);
      });
    },
  },
};
</script>

<style scoped lang="less">
.ev-file-list {
  > li {
    padding-right: 15px;
    border-bottom: 1px solid #d1d1d1;

    &:last-child {
      border-bottom: none;
    }
  }
}

.ev-file-item {
  display: flex;
  align-items: center;
  height: 60px;

  .icon {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

    > i {
      font-size: 24px;
      color: orange;
    }
  }

  .content {
    flex: 1;
    overflow: auto;
    word-break: break-all;
    font-size: 14px;
  }
}

.no-data-tip {
  text-align: center;
  padding: 200px 0;
  font-size: 30px;
  color: #666;
}
</style>