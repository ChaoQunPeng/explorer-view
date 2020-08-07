const http = require('http');
var os = require("os");

//设置主机名和端口号
const hostname = 'localhost';
const port = 3030;


// 后面再取，先放放
// var ifaces = os.networkInterfaces();

const fv = require('./file-view');

// const data = [{ "name": "超感猎杀.Sense8.S01E01.中英字幕.WEB-HR.AAC.1024X576.x264.mp4", "path": "D:\\Movies\\Sense8\\S1超感猎杀.Sense8.S01E01.中英字幕.WEB-HR.AAC.1024X576.x264.mp4" }, { "name": "超感猎杀.Sense8.S01E02.中英字幕.WEB-HR.AAC.1024X576.x264.mp4", "path": "D:\\Movies\\Sense8\\S1超感猎杀.Sense8.S01E02.中英字幕.WEB-HR.AAC.1024X576.x264.mp4" }, { "name": "超感猎杀.Sense8.S01E03.中英字幕.WEB-HR.AAC.1024X576.x264.mp4", "path": "D:\\Movies\\Sense8\\S1超感猎杀.Sense8.S01E03.中英字幕.WEB-HR.AAC.1024X576.x264.mp4" }, { "name": "超感猎杀.Sense8.S01E04.中英字幕.WEB-HR.AAC.1024X576.x264.mp4", "path": "D:\\Movies\\Sense8\\S1超感猎杀.Sense8.S01E04.中英字幕.WEB-HR.AAC.1024X576.x264.mp4" }, { "name": "超感猎杀.Sense8.S01E05.中英字幕.WEB-HR.AAC.1024X576.x264.mp4", "path": "D:\\Movies\\Sense8\\S1超感猎杀.Sense8.S01E05.中英字幕.WEB-HR.AAC.1024X576.x264.mp4" }, { "name": "超感猎杀.Sense8.S01E06.中英字幕.WEB-HR.AAC.1024X576.x264.mp4", "path": "D:\\Movies\\Sense8\\S1超感猎杀.Sense8.S01E06.中英字幕.WEB-HR.AAC.1024X576.x264.mp4" }, { "name": "超感猎杀.Sense8.S01E07.中英字幕.WEB-HR.AAC.1024X576.x264.mp4", "path": "D:\\Movies\\Sense8\\S1超感猎杀.Sense8.S01E07.中英字幕.WEB-HR.AAC.1024X576.x264.mp4" }, { "name": "超感猎杀.Sense8.S01E08.中英字幕.WEB-HR.AAC.1024X576.x264.mp4", "path": "D:\\Movies\\Sense8\\S1超感猎杀.Sense8.S01E08.中英字幕.WEB-HR.AAC.1024X576.x264.mp4" }, { "name": "超感猎杀.Sense8.S01E09.中英字幕.WEB-HR.AAC.1024X576.x264.mp4", "path": "D:\\Movies\\Sense8\\S1超感猎杀.Sense8.S01E09.中英字幕.WEB-HR.AAC.1024X576.x264.mp4" }, { "name": "超感猎杀.Sense8.S01E10.中英字幕.WEB-HR.AAC.1024X576.x264.mp4", "path": "D:\\Movies\\Sense8\\S1超感猎杀.Sense8.S01E10.中英字幕.WEB-HR.AAC.1024X576.x264.mp4" }, { "name": "超感猎杀.Sense8.S01E11.中英字幕.WEB-HR.AAC.1024X576.x264.mp4", "path": "D:\\Movies\\Sense8\\S1超感猎杀.Sense8.S01E11.中英字幕.WEB-HR.AAC.1024X576.x264.mp4" }, { "name": "超感猎杀.Sense8.S01E12.中英字幕.WEB-HR.AAC.1024X576.x264.mp4", "path": "D:\\Movies\\Sense8\\S1超感猎杀.Sense8.S01E12.中英字幕.WEB-HR.AAC.1024X576.x264.mp4" }];
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