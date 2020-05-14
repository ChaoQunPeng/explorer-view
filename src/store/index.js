import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    host: "http://192.168.137.1:8020/",
    root: "D:\\Movies\\",
    paths: []
  },
  mutations: {
    pushPath(state, payload) {
      state.paths.push(payload);
    },
    goBack(state) {
      state.paths.pop();
    }
  }
})

export default store;