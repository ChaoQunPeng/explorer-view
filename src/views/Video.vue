<template>
  <div class="ev-video">
    <div class="video-player">
      <video :src="videoSrc" id="video" class="video" ref="videoPlayer" controls autoplay></video>
    </div>

    <div class="video-info-panel">
      <div class="title">{{title}}</div>
      <ul class="vl-ul">
        <li
          v-for="(item,index) in videoList"
          :key="index"
          :class="[currentVideIndex==index?'active':'']"
          @click="play(item,index)"
        >
          <i v-if="currentVideIndex==index" class="iconfont icon-player"></i>
        
        {{item.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Video',
  data() {
    return {
      videoList: [],
      videoSrc: '',
      title: '请选择要播放的视频',
      currentVideIndex: 0,
    };
  },
  created() {
    this.videoList = this.$route.params.videoList;
    this.videoSrc = this.$convertAccessPath(this.videoList[0].path);
    this.title = this.videoList[0].name;
    this.changeTitle(this.title);
  },
  mounted() {
    // this.$refs.videoPlayer
    const video = this.$refs.videoPlayer;
    // 监听方法会更慢一点，下面的就是先输出‘video.ended’，再输出‘播放结束’
    video.addEventListener('ended', () => {
      // 说明是最后一个了，就跳到第一个去，目前这么做，循环播放
      if (this.currentVideIndex == this.videoList.length - 1) {
        this.videoSrc = this.$convertAccessPath(this.videoList[0].path);
        this.changeTitle(this.videoList[0].name);
        this.currentVideIndex = 0;
      } else {
        this.videoSrc = this.$convertAccessPath(
          this.videoList[this.currentVideIndex + 1].path
        );
        this.changeTitle(this.videoList[this.currentVideIndex + 1].name);
        this.currentVideIndex++;
      }
    });
  },
  methods: {
    play(item, index) {
      this.title = item.name;
      this.videoSrc = this.$convertAccessPath(item.path);
      this.currentVideIndex = index;
      this.changeTitle(this.title);
    },
    changeTitle(title) {
      document.title = title;
    },
    // 将绝对路径转成服务器的地址
    // convertPath(path) {
    //   return path.replace(this.diskRoot, this.moviesHost);
    // },
  },
  computed: {
    // moviesHost() {
    //   return this.$store.state.moviesHost;
    // },
    // diskRoot() {
    //   return this.$store.state.diskRoot;
    // },
  },
};
</script>

<style scoped lang="less">
.ev-video {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.video-player {
  width: 100%;
  height: calc(100vw * 9 / 16);
  background: #d1d1d1;
}

.video {
  display: block;
  width: 100%;
  height: 100%;
}

.video-info-panel {
  flex-grow: 2 !important;
  overflow-y: auto;
}

.vl-ul {
  background: #f1f1f1;
}

.vl-ul > li {
  padding: 15px 10px;
  border-bottom: 1px solid #d1d1d1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &.active {
    background: #0097e6;
    color: #fff;
  }
}

.title {
  margin-bottom: 20px;
  padding: 10px;
  font-size: 18px;
}
</style>