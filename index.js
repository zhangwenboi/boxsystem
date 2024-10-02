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

app.post('/api/system-exec-time-piker', async (req, res) => {
  try {
    console.log(req);

    // res.status(200).send({
    //   data,
    //   msg: 'success',
    //   code: 200
    // });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/system-info-to-yes', async (req, res) => {
  try {
    // 获取网卡流量信息
    Promise.all([si.networkInterfaces(), si.cpu(), si.mem(), si.diskLayout()]).then(async ([networkInterfaces, cpu, mem, disk]) => {
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
      const neda = stdout
        .trim()
        .replace(/\||-{2,}|\+/g, '')
        .split('\n')
        .slice(2);

      // 提取表头字段
      const headers = neda[0].split(/\s{2,}/).slice(1);

      neda.splice(neda.length - 2, 1);
      const data = neda.slice(2).map((item) => {
        const values = item.replace(/\|/g, '').split(/\s{2,}/);
        return headers
          .filter((e) => !e?.includes('total') && !e?.includes('tx'))
          .reduce((acc, curr, i) => {
            acc[curr] = values[i + 1];
            return acc;
          }, {});
      });

      res.status(200).send({ data, code: 200, msg: 'success' });
    });
  } catch (error) {}
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
