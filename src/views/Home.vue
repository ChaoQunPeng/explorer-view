<template>
  <div>
    <ul class="ev-file-list" style="list-style:none;">
      <li v-for="(item,index) in dirList" :key="index" @click="clickItem(item)">
        <div class="ev-file-item">
          <div class="icon">
            <!-- {{dict[file.type].text}} -->
            <i class="iconfont" :class="[item.type=='file'?'icon-file':'icon-folder']"></i>
          </div>
          <div class="content">{{item.name}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getFileList } from '../api/index';

const dict = {
  dir: {
    text: '文件夹',
    icon: '',
  },
  file: {
    text: '文件',
    icon: '',
  },
};

export default {
  name: 'List',
  data() {
    return {
      dirList: [],
      dict: dict,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const path = this.$store.state.diskRoot;
      getFileList(path, () => {
        this.$store.commit('pushPath', path);
      }).then(({ currentPath, dirList }) => {
        this.dirList = dirList;
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
      let forwardPath = file.path + '\\';
      getFileList(forwardPath, () => {
        this.$store.commit('pushPath', forwardPath);
        this.$store.commit('setDirObjList', file);
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
    '$store.state.paths': function (pathArray) {
      const currentPath = pathArray[pathArray.length - 1];
      getFileList(currentPath).then(({ currentPath, dirList }) => {
        this.dirList = dirList;
        this.$store.commit('setDirList',dirList);
      });
    },
    // '$store.state.dirObjList': function (value) {
    //   getFileList(value.path)
    // }
  },
};
</script>

<style scoped lang="less">
.ev-file-list {
  > li {
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>