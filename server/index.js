const path = require('path');
const express = require("express");
const si = require('systeminformation');
const os = require('os-utils');
const PORT = process.env.PORT || 3001;

const app = express();
const cpuInfo = {};

app.get("/cpu", (req, res) => {
  si.cpu()
  .then(cpu =>res.json({cpu}))
  .catch(error => console.error(error));  
});

app.get("/memory", (req, res) => {
  si.mem()
  .then(memory =>res.json({memory}))
  .catch(error => console.error(error));  
});

app.get("/cpuUsage", (req, res) => {
  os.cpuUsage((v) => {
    cpuInfo.cpuUsage = v;
  });

  os.cpuFree((v) => {
    cpuInfo.cpuFree = v;
  });    

  res.json(cpuInfo);
});

app.get("/memoryUsage", (req, res) => {
  res.json({freemem: os.freemem(), totalmem: os.totalmem(), freememPercentage: os.freememPercentage()});
});



if (process.env.NODE_ENV = 'production') {
  app.use(express.static(path.resolve(__dirname, '/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});