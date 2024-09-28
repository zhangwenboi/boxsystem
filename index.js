/** @format */

const express = require('express');
const os = require('os');
const app = express();
const port = 3000;

const fs = require('fs');
const si = require('systeminformation');

app.get('/api/system-info', async (req, res) => {
  try {
    const networkInterfaces = await si.networkInterfaces();
    console.log(networkInterfaces);
    const systemInfo = {};

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