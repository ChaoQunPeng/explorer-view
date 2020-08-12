import store from '../store'

export default {
  install(Vue, options) {
    Vue.prototype.$convertAccessPath = function (data) {
      const path = data.replace(store.state.diskRoot, store.state.resourceHost);
      return path;
    }
  }
}