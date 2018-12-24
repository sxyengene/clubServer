'use strict';

import sxyConfig from "./config.sxy";

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1544054905245_8727';

  // add your config here
  config.middleware = [];

  import sxyConfig from './config.sxy';

  config.sequelize = {
    dialect:'mysql',
    port:3306,
  }

  Object.assign(config.sequelize,sxyConfig);
  return config;
};
