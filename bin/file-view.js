const fs = require('fs');

function getView(path) {
  let viewList = [];
  fs.readdirSync(path).forEach(fd => {
    const item = fs.statSync(path + fd);
    const currentPath = path + fd;
    const view = new View(
      fd,
      currentPath,
      item.isDirectory() ? 'dir' : 'file',
      extractExtName(fd)
    );

    viewList.push(view);
  });

  return viewList;
}

function extractExtName(fdName) {
  if (fdName.split('.').length >= 2  && fdName.split('.')[0] !== '.') {
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