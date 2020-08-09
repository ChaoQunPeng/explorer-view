<template>
  <div>
    <ul class="ev-file-list">
      <li v-for="(file,index) in list" :key="index" @click="clickItem(file)">
        <div class="ev-file-item">
          <div class="icon">
            <!-- [item.type=='file'?'icon-xingzhuangcopy':'icon-file1'] -->
            <i class="iconfont" :class="setFileIcon(file)"></i>
          </div>
          <div class="content">
            {{file.name}}
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
    setFileIcon(file) {
      let iconClass = '';

      if (file.type == 'dir') {
        iconClass = 'icon-folder rise-shine';
        return iconClass;
      } else {
        switch (file.ext) {
          case 'mp4':
          case 'avi':
          case 'rmvb':
          case 'mkv':
            iconClass = 'icon-video periwinkle';
            break;
          case 'txt':
            iconClass = 'icon-txt seabrook';
            break;
          case 'jpg':
          case 'png':
          case 'ico':
          case 'gif':
            iconClass = 'icon-pic protoss-pylon';
            break;
          default:
            iconClass = 'icon-unknow blueberry-soda';
            break;
        }
      }

      return iconClass;
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
        case 'jpg':
        case 'png':
        case 'ico':
        case 'gif':
          this.$router.push({
            name: 'Picture',
            params: {
              picture: file,
            },
          });
          break;
        // TODO:下次的任务是开发浏览txt等一些文本的页面
        // case 'txt':
        // case 'html':
        //   this.$router.push({
        //     name: 'Txt',
        //     params: {
        //       txt: file,
        //     },
        //   });
        //   break;
        default:
          alert(`
            当前文件：${file.name}，尚未有合适的组件展示
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
  list-style: none;
  padding: 0 5px;

  > li {
    border-bottom: 1px solid #d1d1d1;

    &:last-child {
      // border-bottom: none;
    }
  }
}

.ev-file-item {
  display: flex;
  align-items: center;
  min-height: 60px;

  .icon {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

    > i {
      font-size: 24px;
    }
  }

  .content {
    flex: 1;
    overflow: auto;
    word-break: break-all;
    font-size: 14px;
    line-height: 1.6;
    padding: 5px 10px 5px 0;
    color: #273c75;
  }
}

.no-data-tip {
  text-align: center;
  padding: 200px 0;
  font-size: 30px;
  color: #666;
}
</style>