/** @format */

const express = require('express');
const os = require('os');
const app = express();
const port = 3000;

const fs = require('fs');
const si = require('systeminformation');
// 获取网卡流量信息
const { exec } = require('child_process');

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
    // 执行 vnstat 命令
    exec('vnstat -i eth0 -d', (error, stdout) => {
      if (error) {
        console.error(`exec error: ${error}`);
        res.status(500).send({ error: error.message });
        return;
      }

      const outputLines = stdout.trim().split('\n');

      // 找到内容开始的索引
      let contentStartIndex = outputLines.findIndex((line) => line.includes('------------------'));
      contentStartIndex += 2; // 跳过表头和横线

      const headers = outputLines[contentStartIndex - 1].split('|').map((header) => header.trim().replace(/(^\||\|$)/g, '')); // 获取表头

      const data = outputLines.slice(contentStartIndex, -2).map((line) => {
        const values = line
          .trim()
          .split('|')
          .map((val) => val.trim());
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = values[index];
        });
        return obj;
      });
      res.status(200).send({ data, code: 200, msg: 'success' });
      console.log(data);
    });
  } catch (error) {}
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
