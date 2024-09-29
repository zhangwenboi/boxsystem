// /** @format */

// const http = require('http');
// const https = require('https');

// // 统计总共下载的字节数(mb)
// let totalDownloadedBytes = 0;

// const fileUrls = [
//    ];
// let progresscurrentchunks = 0;
// let alldata = 0;
// const downloadFileContent = (fileUrl) => {
//   try {
//     return new Promise((resolve, reject) => {
//       const protocol = fileUrl.startsWith('https') ? https : http;

//       progresscurrentchunks = 0;
//       let timer = setTimeout(() => {
//         resolve('超时56' + fileUrl);
//       }, 20000);
//       // 发送 HTTP 请求
//       const req = protocol
//         .get(fileUrl, (response) => {
//           alldata = (response.headers['content-length'] / 1024 / 1024)?.toFixed(2);
//           console.log('本次将要下载' + alldata + 'MB');
//           response.on('data', (chunk) => {
//             progresscurrentchunks += chunk.length;
//           });
//           response.on('end', () => {
//             totalDownloadedBytes += alldata;
//             resolve('成功');
//             clearTimeout(timer);
//           });
//           if (alldata > 0) {
//             clearTimeout(timer);
//             timer = setTimeout(() => {
//               resolve('超时56' + fileUrl);
//             }, alldata * 300);
//           }
//         })
//         .on('error', (err) => {
//           resolve('失败70' + err);
//         })
//         .on('timeout', (err) => {
//           resolve('超时53' + err);
//         });

//       req.setTimeout(5000, (err) => {
//         resolve('超时80', err);
//       });
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// const downloadAllFilesContent = async (currentIndex = 0) => {
//   while (true) {
//     try {
//       const fileUrl = fileUrls[currentIndex];
//       const res = await downloadFileContent(fileUrl);
//       console.log(`${res}一共下载了${currentIndex} | ${totalDownloadedBytes}MB \n`);
//       currentIndex = (currentIndex + 1) % fileUrls.length;
//     } catch (error) {
//       const fileUrl = fileUrls[currentIndex];
//       await downloadFileContent(fileUrl);
//       console.log(`下载${fileUrl}失败${error}`);
//       currentIndex = (currentIndex + 1) % fileUrls.length;
//     }
//   }
// };
// const ttttttt = setInterval(() => {
//   console.log(`${(progresscurrentchunks / 1024 / 1024).toFixed(2)} / ${alldata}`);
// }, 1000);

// downloadAllFilesContent(0);

// process.on('uncaughtException', (err) => {
//   console.log('An uncaught exception occurred:', err);
//   clearInterval(ttttttt);
//   downloadAllFilesContent(0);
// });
