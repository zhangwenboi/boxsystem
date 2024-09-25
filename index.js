/** @format */

const express = require('express');
const os = require('os');

const app = express();
const port = 3000;
const fs = require('fs');

function getNetworkSpeed(interfaceName) {
  try {
    const data = fs.readFileSync(`/sys/class/net/${interfaceName}/statistics/tx_bytes`, 'utf8');
    const txBytes = parseInt(data);

    const newData = fs.readFileSync(`/sys/class/net/${interfaceName}/statistics/tx_bytes`, 'utf8');
    const newTxBytes = parseInt(newData);

    // 计算速率
    const speed = (newTxBytes - txBytes) / 1024; // 转换为KB
    return {
      interfaceName,
      speed: speed
    };
  } catch (err) {
    console.error('Error reading network interface data:', err);
  }
}

app.get('/api/system-info', (req, res) => {
  try {
    const networkInterfaces = os.networkInterfaces();
    // 获取网速
    const networkSpeeds = Object.keys(networkInterfaces).map((interfaceName) => getNetworkSpeed(interfaceName));
    const systemInfo = {
      operatingSystem: os.type(),
      release: os.release(),
      totalMemory: os.totalmem(),
      freeMemory: os.freemem(),
      cpus: os.cpus(),
      networkInterfaces,
      totalMem: os.totalmem(),
      freeMem: os.freemem(),
      loadAvg: os.loadavg(),
      networkSpeeds
    };

    res.status(200).send({
      data: systemInfo,
      msg: 'success',
      code: 200
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
