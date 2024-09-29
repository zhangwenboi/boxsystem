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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
