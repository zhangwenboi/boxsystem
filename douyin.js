/** @format */

// /** @format */

const http = require('http');
const https = require('https');

// 统计总共下载的字节数(mb)
let totalDownloadedBytes = 0;

let progresscurrentchunks = 0;
let alldata = 0;

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
const requestData = async (url, callback) => {
  const protocol = url.startsWith('https') ? https : http;
  let timer = setTimeout(() => {
    resolve('超时56' + url);
  }, 20000);
  // 发送 HTTP 请求
  const req = protocol
    .get(url, callback)
    .on('error', (err) => {
      clearTimeout(timer);
      resolve('失败70' + err);
    })
    .on('timeout', (err) => {
      clearTimeout(timer);
      resolve('超时53' + err);
    });

  req.setTimeout(5000, (err) => {
    resolve('超时80', err);
  });
};
const downloadFileContent = (fileUrl) => {
  try {
    return new Promise((resolve, reject) => {
      requestData(fileUrl, (response) => {
        alldata = Number((response.headers['content-length'] / 1024 / 1024)?.toFixed(2));
        console.log('本次将要下载' + alldata + 'MB');
        response.on('data', (chunk) => {
          progresscurrentchunks += Number(chunk.length);
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
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const downloadAllFilesContent = async (currentIndex = 0) => {
  while (true) {
    const fileUrls = [];
    requestData('https://gitee.com/wen_wen_okok/boxurl/raw/master/boxurl/data.txt', (response) => {
      console.log(response);
    });
    // try {
    //   if (!canRun()) {
    //     console.log('不在运行时间！');
    //     await waitTimer(10000);
    //     continue;
    //   } else {
    //     progresscurrentchunks = 0;
    //     const fileUrl = fileUrls[currentIndex];
    //     const res = await downloadFileContent(fileUrl);
    //     console.log(`${res}一共下载了${currentIndex} | ${totalDownloadedBytes}MB \n`);
    //     currentIndex = (currentIndex + 1) % fileUrls.length;
    //   }
    // } catch (error) {
    //   const fileUrl = fileUrls[currentIndex];
    //   await downloadFileContent(fileUrl);
    //   console.log(`下载${fileUrl}失败${error}`);
    //   currentIndex = (currentIndex + 1) % fileUrls.length;
    // }
  }
};

downloadAllFilesContent(0);

process.on('uncaughtException', (err) => {
  console.log('An uncaught exception occurred:', err);
  //   downloadAllFilesContent(0);
});
