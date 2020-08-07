import store from '../store'

export default {
  install(Vue, options) {
    Vue.prototype.$convertAccessPath = function (data) {
      const path = data.replace("D:\\Movies\\", store.state.moviesHost);
      return path;
    }
  }
}