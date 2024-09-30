/** @format */

const http = require('http');
const https = require('https');
const fs = require('fs');
const flvUrl = [
  'https://119-6-224-85.bytefcdnrd.com/thirdgame/stream-692387302828409610_exphd.flv?302_type=cold_aggr&_session_id=037-2024092722495197BBA3CD64F3313A473F.1727448610760.68957&abr_pts=-800&align_delay=-25&cac=1&cb_retry=0&domain=pull-hs-f5.flive.douyincdn.com&expire=1728053392&fp_user_url=https%3A%2F%2Fpull-hs-f5.flive.douyincdn.com%2Fthirdgame%2Fstream-692387302828409610_exphd.flv%3Fexpire%3D1728053392%26sign%3D5d35764d8f109e12cd6150cb1c3659c6%26volcSecret%3D5d35764d8f109e12cd6150cb1c3659c6%26volcTime%3D1728053392%26major_anchor_level%3Dcommon%26abr_pts%3D-800%26_session_id%3D037-2024092722495197BBA3CD64F3313A473F.1727448610760.68957%26rsi%3D1&major_anchor_level=common&manage_ip=&mir=true&node_id=&pro_type=http2&redirect_from=pod.cn-qpskq3.8h6o.nss&redirect_from_ip=116.136.190.173&redirect_to=fc.cn-i5dbs1&redirect_to_ip=119.6.224.85&rsi=1&sign=5d35764d8f109e12cd6150cb1c3659c6&vhost=push-rtmp-hs-f5.douyincdn.com&volcSecret=5d35764d8f109e12cd6150cb1c3659c6&volcTime=1728053392',
  'https://119-6-224-85.bytefcdnrd.com/thirdgame/stream-692387302828409610_exphd.flv?302_type=cold_aggr&_session_id=037-2024092722495197BBA3CD64F3313A473F.1727448610760.68957&abr_pts=-800&align_delay=-25&cac=1&cb_retry=0&domain=pull-hs-f5.flive.douyincdn.com&expire=1728053392&fp_user_url=https%3A%2F%2Fpull-hs-f5.flive.douyincdn.com%2Fthirdgame%2Fstream-692387302828409610_exphd.flv%3Fexpire%3D1728053392%26sign%3D5d35764d8f109e12cd6150cb1c3659c6%26volcSecret%3D5d35764d8f109e12cd6150cb1c3659c6%26volcTime%3D1728053392%26major_anchor_level%3Dcommon%26abr_pts%3D-800%26_session_id%3D037-2024092722495197BBA3CD64F3313A473F.1727448610760.68957%26rsi%3D1&major_anchor_level=common&manage_ip=&mir=true&node_id=&pro_type=http2&redirect_from=pod.cn-qpskq3.8h6o.nss&redirect_from_ip=116.136.190.173&redirect_to=fc.cn-i5dbs1&redirect_to_ip=119.6.224.85&rsi=1&sign=5d35764d8f109e12cd6150cb1c3659c6&vhost=push-rtmp-hs-f5.douyincdn.com&volcSecret=5d35764d8f109e12cd6150cb1c3659c6&volcTime=1728053392',
  'https://v23b444pzspdsjobphn3knsmpo6lzpeya.mobgslb.tbcache.com/pull-l3.douyincdn.com/third/stream-115926668244419039_hd.flv?rsi=1&major_anchor_level=common&auth_key=1728055577-0-0-a44620c6e821ecd89fb006d2d1891157&kabr_spts=-800&_session_id=037-20240927235617F96105B197248A4659C0.1727452581792.70942&ali_dispatch_cold_stream=on&ali_redirect_ex_hot=66666101&ali_stream_type=01&ali_stream_type_ring=&ali_orig_station=cn5721&ali_302c=701&ali_st=cn6816&ali_ts=1727452580',
  'https://ali-adaptive.pull.yximgs.com/gifshow/AZAXFvv07rY_hd2000.flv?auth_key=1727539398-0-0-f47e7a2a0b131a20a7dd8ca36cd34a1c&tsc=origin&oidc=watchmen&sidc=205842&no_script=1&ss=s20&kabr_spts=-5000'
];

let size = 0;
let startTime = new Date();
const downloadFile = (index) => {
  console.log('🚀 ~ index:', index);

  return new Promise((resolve, reject) => {
    const protocol = flvUrl[index].startsWith('https') ? https : http;
    protocol
      .get(flvUrl[index], (response) => {
        response.on('data', (chunk) => {
          // 在这里处理接收到的数据，可以对视频数据进行流式处理或其他操作
          // 例如，可以将数据传输到客户端或进行其他实时处理
          size += chunk.length;
        });

        response.on('end', () => {
          console.log('FLV file stream ended');
          downloadFile(index);
        });

        response.on('error', (error) => {
          console.error('Error receiving FLV file stream:', error);
        });
      })
      .on('error', (err) => {
        console.log(err);
      });
  });
};

// 每隔一段时间下载 FLV 文件
for (let i = 0; i < 30; i++) {
  downloadFile(i % flvUrl.length).catch((error) => console.error('Error downloading FLV file:', error));
}
setInterval(() => {
  const allsize = (size / 1024 / 1024).toFixed(2);
  const time = new Date() - startTime;
  console.log(allsize + 'MB', '已下载', '速度：' + (allsize / time) * 1000 + 'MB/s');
}, 1000);
