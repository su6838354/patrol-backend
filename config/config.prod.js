'use strict';

exports.mysql = {
    // 单数据库信息配置
    client: {
        // host
        host: '139.224.44.238',
        // 端口号
        port: '3307',
        // 用户名
        user: 'root',
        // 密码
        password: 'qwrYlksfnDqrfsa*3weaew',
        // 数据库名
        database: 'patrol',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
};
exports.cors = {
    origin: '*',
    // {string|Function} origin: '*',
    // {string|Array} allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
};
exports.security = {
    csrf: {
        enable: false,
    },
};

module.exports = appInfo => {
  const config = exports;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1529569597417_7842';

  // add your config here
  config.middleware = [];

  return config;
};
