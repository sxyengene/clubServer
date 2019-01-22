'use strict';
module.exports = appInfo => {
  console.log(123123)
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1544054905245_8727';

  // add your config here
  config.middleware = [
    'format'
  ];

  exports.format ={
    enable:true,
    // enable:false
  }


  const sxyConfig = require('./config.sxy.js');
  config.sequelize = {
    dialect:'mysql',
    port:3306,
    define:{
      freezeTableName:true,
      createdAt:false,
      updatedAt:false,
      deletedAt:false,
    }
  }

  config.salt = sxyConfig.salt;

  Object.assign(config.sequelize,sxyConfig.sequelize);


  /*http 状态码
  * 1000 query校验未通过
   */

  return config;
};
