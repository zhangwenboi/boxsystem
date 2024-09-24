/** @format */

const http = require('http');
const https = require('https');
process.on('uncaughtException', (err) => {
  console.log('An uncaught exception occurred:', err);
});
// 统计总共下载的字节数(mb)
let totalDownloadedBytes = 0;

const fileUrls = [
  'https://store.storevideos.cdn-apple.com/v1/store.apple.com/st/1666383693478/atvloop-video-202210/streams_atvloop-video-202210/1920x1080/fileSequence3.m4s',
  'https://res.sootool.net/client/pc-package/sem/%E7%B2%BE%E7%81%B5%E5%A3%81%E7%BA%B8_t30_d1005_sc5YGwfKFc.exe',
  'https://iptv.tsinghua.edu.cn/st_new_HB1/garbage.php?ckSize=10240',
  'https://activity.hdslb.com/blackboard/static/20210604/4d40bc4f98f94fbc71c235832ce3efd4/hJEhL6jGOY.zip',
  'https://gamesvmg.wmupd.com/webops/10102.mp4',
  'https://g-game-1317274415.cos.ap-guangzhou.myqcloud.com/ieg/img-pc/video-pc.mp4',
  'https://vd3.bdstatic.com/mda-pm9zn07ydwzhfw85/1080p/cae_h264/1702252000350219836/mda-pm9zn07ydwzhfw85.mp4',
  'https://image.uc.cn/s/uae/g/3o/broccoli/resource/202401/zry_video.mp4',
  'https://mksoftcdnhp.mydown.com/66f07704/447ca2e9853c93bf830f84782cc23808/uploadsoft/IQIYIsetup_tj%40kb002.exe',
  'https://mdn.alipayobjects.com/ind_developertool/afts/file/A*fSAmSbgxLosAAAAAAAAAAAAADlx-AQ?af_fileName=AlipayKeyTool-2.0.3.dmg',
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

let timer = null;
const downloadFileContent = (fileUrl) => {
  return new Promise((resolve, reject) => {
    try {
      if (timer) {
        clearTimeout(timer);
      }
      const protocol = fileUrl.startsWith('https') ? https : http;

      protocol
        .get(fileUrl, (response) => {
          let data = 0;
          let startTime = Date.now(); // 记录开始时间
          let downloadedBytes = 0;
          let lastProgress = 0;
          timer = setTimeout(() => {
            const currentTime = Date.now();
            const elapsedTime = (currentTime - startTime) / 1000; // 转换为秒
            const speed = data / elapsedTime / 1024 / 1024; // 下载速度（mb/秒）
            if (speed < 1) {
              console.log(`太慢了!换${data},${response.headers['content-length']}`);
              resolve();
              return;
            }
          }, 5000);

          response.on('data', (chunk) => {
            data += chunk.length;
            downloadedBytes += chunk.length;

            // 计算下载进度
            const progress = (downloadedBytes / response.headers['content-length']) * 100;
            const currentTime = Date.now();
            const elapsedTime = (currentTime - startTime) / 1000; // 转换为秒
            const speed = downloadedBytes / elapsedTime; // 下载速度（字节/秒）

            // 如果进度增加了至少1%，或者是第一次进入循环
            if (progress >= lastProgress + 1 || lastProgress === 0) {
              // 打印百分比、下载速度、用时和文件大小
              process.stdout.write(
                `  ${progress.toFixed(2)}% -  Speed: ${(speed / 1024 / 1024).toFixed(2)} MB/s - Time: ${elapsedTime.toFixed(2)} sec - Size: ${(
                  response.headers['content-length'] /
                  1024 /
                  1024
                )?.toFixed(2)} MB \r`
              );
              lastProgress = progress;
            }
          });

          response.on('end', () => {
            totalDownloadedBytes += data / 1024 / 1024;
            process.stdout.write(`\n文件下载成功 ${fileUrl}: ${totalDownloadedBytes.toFixed(2)} MB`); // 如果达到一定条件，换行
            resolve();
          });
        })
        .on('error', (err) => {
          console.log('失败', error);
          reject(err);
        });
    } catch (error) {
      console.log('失败', error);
      reject(err);
    }
  });
};

const downloadAllFilesContent = async () => {
  let currentIndex = 0;
  while (true) {
    try {
      const fileUrl = fileUrls[currentIndex];
      await downloadFileContent(fileUrl);
      console.log(`当前一共下载了${totalDownloadedBytes.toFixed(2)}MB \n`);
      currentIndex = (currentIndex + 1) % fileUrls.length;
    } catch (error) {
      console.error('Error downloading file content:', error);
      currentIndex = (currentIndex + 1) % fileUrls.length;
    }
  }
};

downloadAllFilesContent();
