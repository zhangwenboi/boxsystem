/** @format */

const { exec } = require('child_process');

// 统计总共下载的字节数(mb)

const fileUrls = [
  'https://v3-cold3.douyinvod.com/87141be4a8c52fe3c3f387ad2063f11a/66f8474c/video/tos/cn/tos-cn-ve-15-alinc2/626ffd637eda40cfbe2589197dd9bc12/?a=1128&ch=0&cr=0&dr=0&cd=0%7C0%7C0%7C0&cv=1&br=1096&bt=1096&cs=0&ds=4&ft=BaXAWVVywSyRKJ8kmo~pK7pswApj2ZOwvrKpIdocdo0g3cI&mime_type=video_mp4&qs=0&rc=aWlpNGg5Ojc1Zjs3ZGhmNUBpajU2NGU6Zmo7ODMzNGkzM0BeXzFjYWMzXjQxX2MwYmMwYSMvaS9ecjQwZmxgLS1kLS9zcw%3D%3D&btag=80010e000b8001&cquery=100y&dy_q=1727511718&l=2024092816215866D85F83A9B1A5719544',
  'https://v11-cold1.douyinvod.com/4fcb03f4e44c57a75053cef1044d5143/66f7e0a8/video/tos/cn/tos-cn-ve-15/osTlBQ20cAqKr9PegQeO6SCntbssWHsDAABvWI/?a=1128&ch=0&cr=0&dr=0&cd=0%7C0%7C0%7C0&br=862&bt=862&cs=0&ds=6&ft=BaXAWVVywSyRKJ80mo~6RXMkWApzZjOwvrKXRuWbto0g3cI&mime_type=video_mp4&qs=1&rc=Nzo3NGY8ZGc3ZTg7OTRpO0BpanA7dzg6ZmVmcTMzNGkzM0AwNDRiYTAvNjMxL19hNGBjYSMwamcxcjRfb2lgLS1kLS9zcw%3D%3D&btag=80010e000bd001&cquery=100y&dy_q=1727513855&feature_id=46a7bb47b4fd1280f3d3825bf2b29388&l=20240928165735D2FE643B74E63A7ACE44',
  'https://v5-coldm.douyinvod.com/1e1e39c76203d68d870497faa6944352/66f84501/video/tos/cn/tos-cn-ve-15c001-alinc2/oMB6AXeVq8VCmADgIkDnw2beEGDEgmZpACU8r9/?a=1128&ch=0&cr=0&dr=0&cd=0%7C0%7C0%7C0&cv=1&br=604&bt=604&cs=0&ds=6&ft=BaXAWVVywSyRKJ8kmo~pK7pswAp_djOwvrKpIdocdo0g3cI&mime_type=video_mp4&qs=0&rc=ZjtpNzw4ZDhlZDY5OGdpZ0BpM3lzdGY6Zmk2azMzNGkzM0AwLS5gMTZjNi4xLy0uLV5iYSNjaWYxcjQwZ15gLS1kLS9zcw%3D%3D&btag=80010e000bd001&cquery=100y&dy_q=1727513926&feature_id=f0150a16a324336cda5d6dd0b69ed299&l=2024092816584618D53E001221F5718D61'
];
const downFile = (index) => {
  try {
    exec(`curl --connect-timeout 10 --max-time 600 --output file.txt ${fileUrls[index]}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`执行错误: ${error.message}`);
        downFile(index + (1 % fileUrls.length));
      } else {
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        downFile(index + (1 % fileUrls.length));
      }
    });
  } catch (error) {
    console.log(error);
  }
};
downFile(0);

process.on('uncaughtException', (err) => {
  console.log('An uncaught exception occurred:', err);
  downFile(0);
});
