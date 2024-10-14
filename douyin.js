/** @format */

const http = require('http');
const https = require('https');
const fs = require('fs');

// 统计总共下载的字节数(mb)
let totalDownloadedBytes = 0;
let errorurllenth = 0;

let fileUrls = [];
let timer;
let timer2;
const baseurl = 'https://gitee.com/wen_wen_okok/boxurl/raw/master/data.json';
const getFileSize = (url) => {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    setTimeout(() => {
      resolve(10);
    }, 5000);
    protocol
      .request(url, { method: 'HEAD' }, (res) => {
        if (res.statusCode === 200) {
          resolve(res.headers['content-length']);
        } else {
          resolve(0);
        }
      })
      .end();
  });
};
const downloadFileContent = (fileUrl) => {
  try {
    return new Promise(async (resolve, reject) => {
      const protocol = fileUrl.startsWith('https') ? https : http;
      const filesize = await getFileSize(fileUrl);
      if (filesize === 0) {
        resolve(`文件大小获取失败`);
        return;
      }
      const mbsize = (filesize / 1024 / 1024).toFixed(2);

      console.log(`本次将要下载 ${mbsize}`);
      // 发送 HTTP 请求
      protocol
        .get(fileUrl, (response) => {
          let data = 0;
          let downloadedBytes = 0;
          response.on('data', (chunk) => {
            data += chunk.length;
            downloadedBytes += chunk.length;
          });
          let speedtimer = setInterval(() => {
            console.log(`已下载${(downloadedBytes / 1024 / 1024).toFixed(2)}MB`);
          }, 5000);
          response.on('end', () => {
            totalDownloadedBytes += data;
            clearTimeout(timer);
            clearTimeout(speedtimer);
            resolve('成功');
          });
        })
        .on('error', (err) => {
          resolve('失败70' + err);
          errorurllenth++;
        })
        .on('timeout', (err) => {
          errorurllenth++;
          resolve('超时53' + err);
        });
      timer = setTimeout(() => {
        resolve('超时56' + fileUrl);
        errorurllenth++;
      }, mbsize * 300);
    });
  } catch (error) {
    console.log(error);
  }
};

const getUrls = async (url) => {
  return await new Promise((resolve, reject) => {
    try {
      const protocol = url.startsWith('https') ? https : http;
      // 发送 HTTP 请求
      protocol
        .get(url, (response) => {
          let data = '';
          response.on('data', (res) => {
            data += res;
          });
          response.on('end', () => {
            clearTimeout(timer2);
            resolve({
              success: true,
              data,
              msg: '成功'
            });
          });
        })
        .on('error', (err) => {
          resolve({
            success: false,
            data: null,
            msg: err
          });
        })
        .on('timeout', (err) => {
          resolve({
            success: false,
            data: null,
            msg: err
          });
        });
      timer2 = setTimeout(() => {
        resolve({
          success: false,
          data: null,
          msg: '超时 ' + url
        });
      }, 10000);
    } catch (error) {
      resolve({
        success: false,
        msg: error,
        data: null
      });
    }
  });
};
const getFileData = () => {
  try {
    const res = fs.readFileSync('runtimer.json', 'utf8');
    return JSON.parse(res);
  } catch (error) {
    return { start: '0:0', end: '0:0' };
  }
};
const canRun = () => {
  const startEnd = getFileData();
  if (startEnd?.start === startEnd?.end) {
    return true;
  }

  // 获取当前时间的小时和分钟
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  // 定义时间范围
  const [startHour, startMinute] = startEnd?.start?.split(':')?.map(Number);
  const [endHour, endMinute] = startEnd?.end?.split(':')?.map(Number);

  // 判断当前时间是否在时间范围内
  if ((currentHour > startHour || (currentHour === startHour && currentMinute >= startMinute)) && (currentHour < endHour || (currentHour === endHour && currentMinute <= endMinute))) {
    return true;
  } else {
    return false;
  }
};
const waitTimer = async (time) => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const startDownload = async (currentIndex) => {
  if (!canRun()) {
    console.log('不在运行时间！');
    await waitTimer(10000);
  } else {
    if (errorurllenth >= fileUrls.length) {
      const res = await getUrls(baseurl);
      if (res.success) {
        fileUrls = JSON.parse(res.data)?.data;
        errorurllenth = 0;
      }
    }
    const fileUrl = fileUrls[currentIndex];
    const res = await downloadFileContent(fileUrl);
    console.log(`${res}一共下载了${currentIndex} | ${(totalDownloadedBytes / 1024 / 1024).toFixed(2)}MB \n`);
    currentIndex = (currentIndex + 1) % fileUrls.length;
  }
};
const downloadAllFilesContent = async (currentIndex = 0) => {
  if (fileUrls.length == 0) {
    const res = await getUrls(baseurl);
    if (res.success) {
      fileUrls = JSON.parse(res.data)?.data;
      errorurllenth = 0;
    }
  }
  while (true) {
    try {
      await startDownload(currentIndex);
    } catch (error) {
      continue;
    }
  }
};

downloadAllFilesContent(0);

process.on('uncaughtException', async (err) => {
  console.log('An uncaught exception occurred:', err);
  await waitTimer(5000);
  downloadAllFilesContent(0);
});
