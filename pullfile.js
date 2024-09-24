/** @format */

const http = require('http');
const https = require('https');
process.on('uncaughtException', (err) => {
  console.log('An uncaught exception occurred:', err);
});
// 统计总共下载的字节数(mb)
let totalDownloadedBytes = 0;

const urls = [
  'https://epg.112114.free.hr',
  'http://cdn.1678520.xyz/epg/',
  'https://ali-m-l.cztv.com/channels/lantian/channel006/1080p.m3u8',
  'https://epg.112114.free.hr/pp.xml',
  'http://cdn.1678520.xyz/xml',
  'https://epg.112114.free.hr',
  'http://cdn.1678520.xyz/epg/',
  'https://ali-m-l.cztv.com/channels/lantian/channel006/1080p.m3u8',
  'https://epg.112114.free.hr/pp.xml',
  'http://cdn.1678520.xyz/xml',
  'https://epg.112114.free.hr',
  'http://cdn.1678520.xyz/epg/',
  'https://ali-m-l.cztv.com/channels/lantian/channel006/1080p.m3u8',
  'https://epg.112114.free.hr/pp.xml',
  'http://cdn.1678520.xyz/xml',
  'https://epg.112114.free.hr',
  'http://cdn.1678520.xyz/epg/',
  'https://ali-m-l.cztv.com/channels/lantian/channel006/1080p.m3u8',
  'https://epg.112114.free.hr/pp.xml',
  'http://cdn.1678520.xyz/xml'
];
const startTime = Date.now();

let totalBytes = 0;

const makeRequest = async (url) => {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const request = protocol.get(url, (response) => {
      response.on('data', (chunk) => {
        totalBytes += chunk.length;
      });

      response.on('end', () => {
        const endTime = Date.now();
        const elapsedTime = endTime - startTime;
        const uploadSpeed = totalBytes / elapsedTime; // bytes per millisecond
        const uploadSpeedMB = uploadSpeed / 1000000; // bytes per millisecond to MB per millisecond

        console.log(`Received data from ${url}. Upload Speed: ${uploadSpeed} /ms`);
        resolve();
      });
    });

    request.on('error', (error) => {
      console.error('Error fetching m3u8 file:', error.message);
      // Switch to the next URL on error
      currentUrlIndex = (currentUrlIndex + 1) % urls.length;
      reject(error);
    });
  });
};

const eachMu38 = async () => {
  await Promise.all(
    urls.map(async (url) => {
      await makeRequest(url);
    })
  );
  await eachMu38();
};

eachMu38();
