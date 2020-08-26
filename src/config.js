let CONFIG = {}

const CONFIG_DEV = {
  // 服务端接口地址（一般不用改）
  apiHost: 'http://localhost:3030/',
  // 资源服务器地址（我自己是用IIS部署的一个）
  resourceHost: 'http://192.168.137.1:8020/',
  // 本地工作根路径，用于读取本地文件
  diskRoot: 'D:/Movies/',
}

const CONFIG_PROD = {
  // 服务端接口地址（一般不用改）
  apiHost: 'http://192.168.137.1:3031/',
  // 资源服务器地址（我自己是用IIS部署的一个）
  resourceHost: 'http://192.168.137.1:8020/',
  // 本地工作根路径，用于读取本地文件
  diskRoot: 'D:/Movies/',
}

switch (process.env.NODE_ENV) {
  case 'development':
    CONFIG = CONFIG_DEV;
    break;
  case 'production':
    CONFIG = CONFIG_PROD;
    break;
  case 'test':
    break;
  default:
    throw 'no config';
}

export {
  CONFIG
}