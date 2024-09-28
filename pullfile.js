/** @format */

const http = require('http');
const https = require('https');

// 统计总共下载的字节数(mb)
let totalDownloadedBytes = 0;

const fileUrls = [
  'https://store.storevideos.cdn-apple.com/v1/store.apple.com/st/1666383693478/atvloop-video-202210/streams_atvloop-video-202210/1920x1080/fileSequence3.m4s',
  'https://activity.hdslb.com/blackboard/static/20210604/4d40bc4f98f94fbc71c235832ce3efd4/hJEhL6jGOY.zip',
  'https://g-game-1317274415.cos.ap-guangzhou.myqcloud.com/ieg/img-pc/video-pc.mp4',
  'https://image.uc.cn/s/uae/g/3o/broccoli/resource/202401/zry_video.mp4',
  'https://listen.10155.com/listener/womusic-bucket/90115000/mv_vod/volte_mp4/20240828/24082811311828635791463694337.mp4?user=N/A&channelid=3000013947&contentid=91789000202408288653360&id=A2717860B0CACFC8158DE8D945977296&timestamp=1725695181&isSegment=0',
  'https://listen.10155.com/listener/womusic-bucket/90115000/mv_vod/volte_mp4/20240102/1742110336858882049.mp4?timestamp=1723283862&user=99999999999&channelid=3000013947&contentid=91789000202408096553510&id=FB3882939CFA06C95BD0E1D0258DE867&isSegment=0',
  'https://desk.ctyun.cn:8999/desktop-prod/software/windows_tob_client/15/64/202000005/CtyunClouddeskUniversal_2.0.0_202000005_x86_20230421161227_Setup_Signed.exe',
  'https://www.apple.com/105/media/us/apple-vision-pro/2024/6e1432b2-fe09-4113-a1af-f20987bcfeee/anim/foundation/large.mp4',
  'https://pc-dl.migufun.com:8443/channelpackage/mgame-2djSBy.exe',
  'https://consumer.huawei.com/content/dam/huawei-cbg-site/cn/mkt/harmonyos-3/video/privacy/privacy-safe-center.webm',
  'https://nsh.gdl.netease.com/NGP/NGP_NSH_2.0.81143.exe',
  'https://gh.con.sh/https://github.com/AaronFeng753/Waifu2x-Extension-GUI/releases/download/v2.21.12/Waifu2x-Extension-GUI-v2.21.12-Portable.7z',
  'https://cdn.cnbj1.fds.api.mi-img.com/staticsfile/pc/about/struggle.mp4',
  'https:///game.gtimg.cn/images/game/web202212/bg1.mp4',
  'https://dwxcx.fp.ps.netease.com/file/66d924410bc88733c649d2deflTfOqEc05',
  'https://wegame.gtimg.com/g.55555-r.c4663/wegame-home/login.5c1e9b93.mp4'
];

const downloadFileContent = (fileUrl) => {
  try {
    return new Promise((resolve, reject) => {
      const protocol = fileUrl.startsWith('https') ? https : http;
      // 发送 HTTP 请求
      const req = protocol
        .get(fileUrl, (response) => {
          console.log(response);
          let data = 0;
          let downloadedBytes = 0;
          response.on('data', (chunk) => {
            data += chunk.length;
            downloadedBytes += chunk.length;
          });
          response.on('end', () => {
            totalDownloadedBytes += data;
            resolve('成功');
            clearTimeout(timer);
          });
        })
        .on('error', (err) => {
          resolve('失败70' + err);
        })
        .on('timeout', (err) => {
          resolve('超时53' + err);
        });
      let timer = setTimeout(() => {
        resolve('超时56' + fileUrl);
      }, 20000);
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
      console.log(`${res}一共下载了${currentIndex} | ${(totalDownloadedBytes / 1024 / 1024).toFixed(2)}MB \n`);
      currentIndex = (currentIndex + 1) % fileUrls.length;
    } catch (error) {
      const fileUrl = fileUrls[currentIndex];
      await downloadFileContent(fileUrl);
      console.log(`下载${fileUrl}失败${error}`);
      currentIndex = (currentIndex + 1) % fileUrls.length;
    }
  }
};

downloadAllFilesContent(0);

process.on('uncaughtException', (err) => {
  console.log('An uncaught exception occurred:', err);
  downloadAllFilesContent(0);
});
