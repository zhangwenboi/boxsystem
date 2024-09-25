/** @format */

const express = require('express');
const os = require('os');

const app = express();
const port = 3000;

app.get('/system-info', (req, res) => {
  const systemInfo = {
    operatingSystem: os.type(),
    release: os.release(),
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    cpus: os.cpus(),
    networkInterfaces: os.networkInterfaces()
  };

  res.json(systemInfo);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
