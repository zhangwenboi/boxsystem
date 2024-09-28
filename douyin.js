/** @format */

const http = require('http');
const https = require('https');

// 统计总共下载的字节数(mb)
let totalDownloadedBytes = 0;

const fileUrls = [
  'https://v11-cold1.douyinvod.com/db0a828f9ab8dd0fe9af012027ff70c0/66f89011/video/tos/cn/tos-cn-ve-15-alinc2/58d2b01612f74fa2b2efed0bbdd1679c/?a=1128&ch=0&cr=0&dr=0&lr=xigua_aweme_play_suffix&cd=0%7C0%7C0%7C0&cv=1&br=811&bt=811&cs=0&ds=2&ft=rVQ6egwwZRt.skDo1PDS6kFgAX1tGnO6lf9eFZX6xAr12nzXT&mime_type=video_mp4&qs=0&rc=OWU7PDZlaTRkOjtlNDxmOEBpM2l2M2k6Zm85ODMzNGkzM0A1L2FfYDE1NS0xNTVeMzExYSNvY2YwcjRfbHBgLS1kLTBzcw%3D%3D&btag=c0010e000bd001&cquery=100y&dy_q=1727526218&l=202409282023380C0FFD0957B1EBAA4835',
  'https://v11-cold1.douyinvod.com/84d8ffba3e66de35c98fb277a8ac4019/66f88f81/video/tos/cn/tos-cn-ve-15-alinc2/58d2b01612f74fa2b2efed0bbdd1679c/?a=1128&ch=0&cr=0&dr=0&lr=xigua_aweme_play_suffix&cd=0%7C0%7C0%7C0&cv=1&br=811&bt=811&cs=0&ds=2&ft=BaXAWVVywSyRKJ80mo~6RXMkWAp0bTOwvrKQVXeH2o0g3cI&mime_type=video_mp4&qs=0&rc=OWU7PDZlaTRkOjtlNDxmOEBpM2l2M2k6Zm85ODMzNGkzM0A1L2FfYDE1NS0xNTVeMzExYSNvY2YwcjRfbHBgLS1kLTBzcw%3D%3D&btag=c0010e000bd001&cquery=100y&dy_q=1727526074&l=20240928202114D27545508816938DF6DA',
  'https://v3-cold3.douyinvod.com/87141be4a8c52fe3c3f387ad2063f11a/66f8474c/video/tos/cn/tos-cn-ve-15-alinc2/626ffd637eda40cfbe2589197dd9bc12/?a=1128&ch=0&cr=0&dr=0&cd=0%7C0%7C0%7C0&cv=1&br=1096&bt=1096&cs=0&ds=4&ft=BaXAWVVywSyRKJ8kmo~pK7pswApj2ZOwvrKpIdocdo0g3cI&mime_type=video_mp4&qs=0&rc=aWlpNGg5Ojc1Zjs3ZGhmNUBpajU2NGU6Zmo7ODMzNGkzM0BeXzFjYWMzXjQxX2MwYmMwYSMvaS9ecjQwZmxgLS1kLS9zcw%3D%3D&btag=80010e000b8001&cquery=100y&dy_q=1727511718&l=2024092816215866D85F83A9B1A5719544',
  'https://v11-cold1.douyinvod.com/4fcb03f4e44c57a75053cef1044d5143/66f7e0a8/video/tos/cn/tos-cn-ve-15/osTlBQ20cAqKr9PegQeO6SCntbssWHsDAABvWI/?a=1128&ch=0&cr=0&dr=0&cd=0%7C0%7C0%7C0&br=862&bt=862&cs=0&ds=6&ft=BaXAWVVywSyRKJ80mo~6RXMkWApzZjOwvrKXRuWbto0g3cI&mime_type=video_mp4&qs=1&rc=Nzo3NGY8ZGc3ZTg7OTRpO0BpanA7dzg6ZmVmcTMzNGkzM0AwNDRiYTAvNjMxL19hNGBjYSMwamcxcjRfb2lgLS1kLS9zcw%3D%3D&btag=80010e000bd001&cquery=100y&dy_q=1727513855&feature_id=46a7bb47b4fd1280f3d3825bf2b29388&l=20240928165735D2FE643B74E63A7ACE44',
  'https://v5-coldm.douyinvod.com/1e1e39c76203d68d870497faa6944352/66f84501/video/tos/cn/tos-cn-ve-15c001-alinc2/oMB6AXeVq8VCmADgIkDnw2beEGDEgmZpACU8r9/?a=1128&ch=0&cr=0&dr=0&cd=0%7C0%7C0%7C0&cv=1&br=604&bt=604&cs=0&ds=6&ft=BaXAWVVywSyRKJ8kmo~pK7pswAp_djOwvrKpIdocdo0g3cI&mime_type=video_mp4&qs=0&rc=ZjtpNzw4ZDhlZDY5OGdpZ0BpM3lzdGY6Zmk2azMzNGkzM0AwLS5gMTZjNi4xLy0uLV5iYSNjaWYxcjQwZ15gLS1kLS9zcw%3D%3D&btag=80010e000bd001&cquery=100y&dy_q=1727513926&feature_id=f0150a16a324336cda5d6dd0b69ed299&l=2024092816584618D53E001221F5718D61'
];
let progresscurrentchunks = 0;
let alldata = 0;
const downloadFileContent = (fileUrl) => {
  try {
    return new Promise((resolve, reject) => {
      const protocol = fileUrl.startsWith('https') ? https : http;

      progresscurrentchunks = 0;
      let timer = setTimeout(() => {
        resolve('超时56' + fileUrl);
      }, 20000);
      // 发送 HTTP 请求
      const req = protocol
        .get(fileUrl, (response) => {
          alldata = (response.headers['content-length'] / 1024 / 1024)?.toFixed(2);
          console.log('本次将要下载' + alldata + 'MB');
          response.on('data', (chunk) => {
            progresscurrentchunks += chunk.length;
          });
          response.on('end', () => {
            totalDownloadedBytes += alldata;
            resolve('成功');
            clearTimeout(timer);
          });
          if (alldata > 0) {
            clearTimeout(timer);
            timer = setTimeout(() => {
              resolve('超时56' + fileUrl);
            }, alldata * 300);
          }
        })
        .on('error', (err) => {
          resolve('失败70' + err);
        })
        .on('timeout', (err) => {
          resolve('超时53' + err);
        });

      req.setTimeout(5000, (err) => {
        resolve('超时80', err);
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const downloadAllFilesContent = async (currentIndex = 0) => {
  while (true) {
    try {
      const fileUrl = fileUrls[currentIndex];
      const res = await downloadFileContent(fileUrl);
      console.log(`${res}一共下载了${currentIndex} | ${totalDownloadedBytes}MB \n`);
      currentIndex = (currentIndex + 1) % fileUrls.length;
    } catch (error) {
      const fileUrl = fileUrls[currentIndex];
      await downloadFileContent(fileUrl);
      console.log(`下载${fileUrl}失败${error}`);
      currentIndex = (currentIndex + 1) % fileUrls.length;
    }
  }
};
const ttttttt = setInterval(() => {
  console.log(`${(progresscurrentchunks / 1024 / 1024).toFixed(2)} / ${alldata}`);
}, 1000);

downloadAllFilesContent(0);

process.on('uncaughtException', (err) => {
  console.log('An uncaught exception occurred:', err);
  clearInterval(ttttttt);
  downloadAllFilesContent(0);
});
