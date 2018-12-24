'use strict';
module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1544054905245_8727';

  // add your config here
  config.middleware = [];

  const sxyConfig = require('./config.sxy.js');

  config.sequelize = {
    dialect:'mysql',
    port:3306,
  }

  Object.assign(config.sequelize,sxyConfig);
  return config;
};
