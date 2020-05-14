import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    paths: []
  },
  mutations: {
    pushPath(state, payload) {
      state.paths.push(payload);
    }
  }
})

export default store;