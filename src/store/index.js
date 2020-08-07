import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    apiHost: 'http://localhost:3030/',
    moviesHost: 'http://localhost:8020/',
    diskRoot: "D:\\Movies\\",
    paths: []
  },
  mutations: {
    pushPath(state, payload) {
      state.paths.push(payload);
    },
    goBack(state) {
      state.paths.pop();
    },
    goRoot(state) {
      state.paths = [this.root];
    }
  }
})

export default store;