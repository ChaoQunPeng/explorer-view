import store from '../store/index';


/**
 * 读取当前路劲下的所有文件
 * @param {*} path 文件夹目录
 * @param {*} callback 回调函数
 */
function getFileList(path, callback) {
  return new Promise((reslove, reject) => {
    fetch(store.state.apiHost, {
      method: "POST",
      body: JSON.stringify({ path: path })
    }).then(data => {
      return data.json();
    })
      .then(res => {
        reslove(res);

        if (callback) {
          callback();
        }

      }).catch(err => {
        alert(err);
        reject(err);
      });
  });
}

export {
  getFileList
}