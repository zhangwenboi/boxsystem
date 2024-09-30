/** @format */

module.exports = {
  apps: [
    {
      name: 'api服务',
      script: '/root/project/index.js',
      args: 'limit'
    },
    {
      name: '拉下行',
      script: '/root/project/pullfile.js',
      args: 'rotate'
    }
  ]
};
