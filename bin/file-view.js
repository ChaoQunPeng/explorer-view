const fs = require('fs');

/**
 * 根据路径获取路径下的文件
 * @param {*} path 路径
 */
function getView(path) {
  let viewList = [];
  let f = fs.readdirSync(path);
  fs.readdirSync(path).forEach(fd => {
    try {
      const item = fs.statSync(path + fd);
      const currentPath = path + fd;
      const view = new View(
        fd,
        currentPath,
        item.isDirectory() ? 'dir' : 'file',
        extractExtName(fd)
      );

      viewList.push(view);
    } catch (err) {
      console.error(`Error: ${err.errno}-${err.code}-${err.path}`);
    }

  });

  return viewList.filter(file => file.name.indexOf('$') == -1);
}

/**
 * 提取文件后缀名
 * @param {*} fdName 文件名
 */
function extractExtName(fdName) {
  if (fdName.split('.').length >= 2 && fdName.split('.')[0] !== '.') {
    return fdName.split('.').reverse()[0];
  } else {
    return null;
  }
}

function View(name, path, type, ext) {
  this.name = name;
  this.path = path;
  this.type = type;
  this.ext = ext;
}

module.exports = {
  getView
}