<template>
  <div>
    <div>当前目录：{{currentPath}}</div>
    <div @click="goBack">点击返回上一级目录 {{prev}}</div>

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
      prev: ""
    };
  },
  created() {

  },
  methods: {
    getFileList(path) {
      fetch("http://192.168.137.1:3030/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ path: path })
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          this.fileList = data;
        });
    },
    click(file) {
      if (file.type == "dir") {
        this.getFileList(file.path + "\\");
        this.$store.commit("pushPath", file.path + "\\");
        this.getPreviousPath();
      } else {
        this.openMedia(file);
      }
    },
    openMedia(file) {
      switch (file.type) {
        case "mp4":
        case "avi":
        case "rmvb":
        case "file":
          alert("文件");
          break;
        default:
          break;
      }
    },
    goBack() {
      this.getFileList(this.prev);
    }
  },
  computed: {
    currentPath() {
      return this.$store.state.currentPath;
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