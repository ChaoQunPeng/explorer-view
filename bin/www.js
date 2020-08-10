const http = require('http');
var os = require("os");

//设置主机名和端口号
const hostname = 'localhost';
const port = 3030;


// 后面再取，先放放
// var ifaces = os.networkInterfaces();
const fv = require('./file-view');

//调用http对象的createServer方法，创建一个服务器（接收请求，响应请求）
const server = http.createServer(hostname, (req, res) => { //箭头函数
  res.statusCode = 200;
  // 服务端解决跨域
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method == 'POST') {
    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    });

    req.on('end', chunk => {
      const data = fv.getView(JSON.parse(postData).path);
      res.end(JSON.stringify(data));
    });

  } else {
    res.end(JSON.stringify('no data'));
  }

});


//调用服务器的listen方法，监听主机的端口
server.listen(port, () => {
  // console.log(`成功启动！ http://192.168.137.1:3030/`);  //模板字符串
  console.log(`http://localhost:${port}/`);
});