'use strict';
module.exports = (app) => {
  const Controller = require('egg').Controller;

  class UserController extends Controller {
	  async allUsers() {
		  this.ctx.body = await this.ctx.model.User.findAll({});
	  }
  }

  return UserController
}