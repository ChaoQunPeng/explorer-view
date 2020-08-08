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
    // 目录路径，用于前进后退 文件对象：文件名、后缀名、文件路径和类型（是文件还是文件夹）
    dirList: [],
    // 当前路径下的所有文件
    list: []
  },
  mutations: {
    /**
     * 进入目录
     * @param {*} payload 文件对象：文件名、后缀名、文件路径和类型（是文件还是文件夹）
     */
    forward(state, payload) {
      state.dirList.push(payload);
    },
    backward(state) {
      if (state.dirList.length > 1) {
        state.dirList.pop();
      }
    },
    goRoot(state) {
      state.dirList = [{ name: '主页', path: state.diskRoot }];
    },
    goDir(state, payload) {
      state.dirList = payload;
    }
  },
  getters: {
    currentPath(state) {
      return state.dirList[state.paths.length - 1];
    }
  }
})

export default store;