/** @format */

const express = require('express');
const os = require('os');
const app = express();
const port = 3000;

const fs = require('fs');
const si = require('systeminformation');

app.get('/api/system-network-info', async (req, res) => {
  try {
    // const networkInterfaces = await si.networkInterfaces();
    // const cpu = await si.cpu();
    // const mem = await si.mem();
    // const disk = await si.diskLayout();
    const networkSpeed = await si.networkStats('*');

    res.status(200).send({
      data: networkSpeed,
      msg: 'success',
      code: 200
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/system-info-to-yes', async (req, res) => {
  try {
    // 获取网卡流量信息
    Promise.all([si.networkStats('*'), si.networkInterfaces(), si.cpu(), si.mem(), si.diskLayout()]).then(async ([networkSpeed, networkInterfaces, cpu, mem, disk]) => {
      res.status(200).send({
        data: { networkInterfaces, cpu, mem, disk },
        code: 200,
        msg: 'success'
      });
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get('/api/system-info-all', async (req, res) => {
  try {
    // 获取网卡流量信息
    const { exec } = require('child_process');

    // 执行 vnstat 命令
    exec('vnstat -i eth0 -d', (error, stdout) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }

      // 将输出按行拆分为数组
      const outputArray = stdout.trim().split('\n');

      // 输出结果数组
      console.log(outputArray);
    });
  } catch (error) {}
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
