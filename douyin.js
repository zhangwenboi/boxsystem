/** @format */

// /** @format */

const { request, axios } = require('./utils/api');
const fs = require('fs');

// 统计总共下载的字节数(mb)
let totalDownloadedBytes = 0;
let fileUrls = [];
let errorurllenth = 0;

const getFileData = () => {
  try {
    const res = fs.readFileSync('runtimer.json', 'utf8');
    return JSON.parse(res);
  } catch (error) {
    return { start: 0, end: 0 };
  }
};
const canRun = () => {
  try {
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
  } catch (error) {
    return true;
  }
};
const waitTimer = async (time) => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const getFileSize = async (url) => {
  try {
    const response = await axios.head(url, {
      timeout: 8000
    });
    const fileSize = response.headers['content-length'];
    console.log('文件总大小（MB）:', (fileSize / 1024 / 1024).toFixed(2));
    return fileSize;
  } catch (error) {
    console.error('获取文件大小出错:' + error);
    errorurllenth++;
    return null;
  }
};

const downloadFileContent = (fileUrl) => {
  try {
    return new Promise(async (resolve, reject) => {
      const filenormal = await getFileSize(fileUrl);
      if (!filenormal) {
        resolve(totalDownloadedBytes);
        return;
      }
      request
        .get(fileUrl, {
          responseType: 'blob',
          onDownloadProgress: (evt) => {
            totalDownloadedBytes += evt.bytes;
          },
          onError: (err) => {
            console.log('🚀 ~ err:', err);
            resolve(totalDownloadedBytes);
          }
        })
        .then(() => {
          resolve(totalDownloadedBytes);
        })
        .catch((err) => {
          console.log(err);
          resolve(totalDownloadedBytes);
        });
    });
  } catch (error) {
    console.log(error);
  }
};
const getUrls = async () => {
  const res = await request.get('https://gitee.com/wen_wen_okok/boxurl/raw/master/data.json');
  if (res?.status == 200) {
    fileUrls = res?.data?.data || [];
  }
};

const downloadAllFilesContent = async (currentIndex = 0) => {
  if (fileUrls.length == 0) {
    await getUrls();
  }
  while (true) {
    if (!canRun()) {
      console.log('不在运行时间！');
      await waitTimer(20000);
      continue;
    } else {
      await waitTimer(2000);
      if (errorurllenth >= fileUrls.length) {
        await getUrls();
        errorurllenth = 0;
      }
      try {
        const fileUrl = fileUrls[currentIndex];
        const res = await downloadFileContent(fileUrl);
        console.log(` 编号${currentIndex}| ${(res / 1024 / 1024).toFixed(2)}MB \n`);
        currentIndex = (currentIndex + 1) % fileUrls.length;
      } catch (error) {
        const fileUrl = fileUrls[currentIndex];
        await downloadFileContent(fileUrl);
        console.log(`下载${fileUrl}失败${error}`);
        currentIndex = (currentIndex + 1) % fileUrls.length;
      }
    }
  }
};

downloadAllFilesContent(0);

process.on('uncaughtException', async (err) => {
  await waitTimer(10000);

  console.log('An uncaught exception occurred:', err);
  downloadAllFilesContent(0);
});
