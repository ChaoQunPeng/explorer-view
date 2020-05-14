<template>
  <div>
    <div>当前目录：{{currentPath}}</div>
    <div @click="backward">点击返回上一级目录</div>

    <ul class="ev-file-list" style="list-style:none;">
      <li v-for="(file,index) in fileList" :key="index" @click="click(file)">
        <div class="ev-file-item">
          <div class="icon">{{dict[file.type].text}}</div>
          <div class="content">{{file.name}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
const dict = {
  dir: {
    text: "文件夹",
    icon: ""
  },
  file: {
    text: "文件",
    icon: ""
  }
};

export default {
  name: "List",
  data() {
    return {
      fileList: [],
      dict: dict,
      currentPath: ""
    };
  },
  created() {
    this.init();
    // this.requestData("D:\\");
  },
  methods: {
    init() {
      const path = this.$store.state.root;
      this.requestData(path, () => {
        this.$store.commit("pushPath", path);
      });
    },
    click(file) {
      if (file.type == "dir") {
        this.forward(file.path);
      } else {
        this.openMedia(file);
      }
    },
    forward(path) {
      let forwardPath = path + "\\";
      this.requestData(forwardPath, () => {
        this.$store.commit("pushPath", forwardPath);
      });
    },
    backward() {
      let lastPath = this.$store.state.paths[
        this.$store.state.paths.length - 2
      ];
      // 如果在根目录了，这个lastPath就是undefined
      if (!lastPath) return;
      this.requestData(lastPath, () => {
        this.$store.commit("goBack");
      });
    },
    requestData(path, callback) {
      fetch("http://192.168.137.1:3030/", {
        method: "POST",
        body: JSON.stringify({ path: path })
      })
        .then(data => {
          return data.json();
        })
        .then(res => {
          this.fileList = res;
          this.currentPath = path;
          if (callback) {
            callback();
          }
        });
    },
    openMedia(file) {
      const ext = file.ext;
      switch (ext) {
        case "mp4":
        case "avi":
        case "rmvb":
        case "mkv":
          this.$router.push({
            name: "Video",
            params: file
          });
          break;

        default:
          break;
      }
    }
  }
};
</script>

<style scoped lang="less">
.ev-file-list {
  > li {
    padding: 0 10px;
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