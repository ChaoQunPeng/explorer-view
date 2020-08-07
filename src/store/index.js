import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    apiHost: 'http://localhost:3030/',
    moviesHost: 'http://localhost:8020/',
    diskRoot: 'D:\\Movies\\',
    paths: [],
    currentPath: '',
    dirList: []
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
    }
  },
  getters: {
    currentPath(state) {
      return state.paths[state.paths.length - 1];
    }
  }
})

export default store;