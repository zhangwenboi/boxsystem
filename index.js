/** @format */

const express = require('express');
const os = require('os');

const app = express();
const port = 3000;
const fs = require('fs');

const { exec } = require('child_process');

function getNetworkSpeed(interfaceName) {
  exec(`ifconfig ${interfaceName}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing ifconfig: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`ifconfig stderr: ${stderr}`);
      return;
    }

    const output = stdout.toString();
    const lines = output.split('\n');

    let rxSpeed = 0;
    let txSpeed = 0;

    lines.forEach((line) => {
      if (line.includes('RX bytes')) {
        rxSpeed = parseInt(line.split('RX bytes:')[1].split(' ')[0]) / 1024; // 接收速度，单位为KB
      }
      if (line.includes('TX bytes')) {
        txSpeed = parseInt(line.split('TX bytes:')[1].split(' ')[0]) / 1024; // 发送速度，单位为KB
      }
    });

    return { rxSpeed, txSpeed };
  });
}

// 传入网络接口名称，例如 eth0
getNetworkSpeed('eth0');
app.get('/api/system-info', async (req, res) => {
  try {
    const networkInterfaces = os.networkInterfaces();
    // 获取网速
    const networkSpeeds = Object.keys(networkInterfaces).map((interfaceName) => getNetworkSpeed(interfaceName));
    console.log('🚀 ~ networkSpeeds:', networkSpeeds);

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
