<template>
  <div>
    <div class="header">
      <div>{{currentPath}}</div>
    </div>

    <ul class="ev-file-list" style="list-style:none;">
      <li v-for="(file,index) in fileList" :key="index" @click="clickItem(file)">
        <div class="ev-file-item">
          <div class="icon">{{dict[file.type].text}}</div>
          <div class="content">{{file.name}}</div>
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
      fileList: [],
      dict: dict,
      currentPath: '',
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
      }).then(({ currentPath, fileList }) => {
        this.currentPath = currentPath;
        this.fileList = fileList;
      });
    },
    clickItem(file) {
      if (file.type == 'dir') {
        this.forward(file.path);
      } else {
        this.openMedia(file);
      }
    },
    forward(path) {
      let forwardPath = path + '\\';

      getFileList(forwardPath, () => {
        this.$store.commit('pushPath', forwardPath);
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
      getFileList(currentPath).then(({ currentPath, fileList }) => {
        this.currentPath = currentPath;
        this.fileList = fileList;
      });
    },
  },
};
</script>

<style scoped lang="less">
.ev-file-list {
  > li {
    border-bottom: 1px solid #d1d1d1;
  }
}

.ev-file-item {
  display: flex;
  align-items: center;
  height: 60px;

  .icon {
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    border: 1px solid;
  }

  .content {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>