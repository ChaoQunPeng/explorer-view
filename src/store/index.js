import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 服务端接口地址
    apiHost: 'http://localhost:3030/',
    // 视频文件的地址
    moviesHost: 'http://localhost:8020/',
    // 本地工作根路径
    diskRoot: 'D:\\Movies\\',
    // 目录路径的数组
    paths: [],
    // 目录路径，用于前进后退
    dirList: [],
    // 当前路径下的所有文件及文件夹列表
    list: []
  },
  mutations: {
    pushPath(state, payload) {
      state.paths.push(payload);
    },
    goBack(state) {
      state.paths.pop();
    },
    goRoot(state) {
      state.paths = [state.diskRoot];
    },
    setDirList(state, payload) {
      state.dirList = payload;
    },
    setDirObjList(state, payload) {
      state.dirObjList.push(payload);
    },
    goPath(state, payload) {
      state.dirObjList = state.dirObjList.slice(0, payload.index + 1);
      state.paths = [];
      state.dirObjList.forEach(e => {
        state.paths = e.path;
      });
    }
  },
  getters: {
    currentPath(state) {
      return state.paths[state.paths.length - 1];
    }
  }
})

export default store;