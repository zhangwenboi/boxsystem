/** @format */

const express = require('express');
const os = require('os');

const app = express();
const port = 3000;

const fs = require('fs');

function getNetworkSpeed(interfaceName) {
  fs.readFile('/proc/net/dev', 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading /proc/net/dev: ${err}`);
      return {
        speedRx: 0,
        speedTx: 0
      };
    }

    const lines = data.trim().split('\n').slice(2); // 跳过前两行标题
    const interfaceData = lines.find((line) => line.includes(interfaceName));
    if (interfaceData) {
      const values = interfaceData.trim().split(/\s+/);
      const rxBytes = parseInt(values[1]);
      const txBytes = parseInt(values[9]);
      const speedRx = rxBytes / 1024; // 接收速度，单位为KB
      const speedTx = txBytes / 1024; // 发送速度，单位为KB
      return { speedRx, speedTx };
    } else {
      return { speedRx: 0, speedTx: 0 };
    }
  });
}

app.get('/api/system-info', async (req, res) => {
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
