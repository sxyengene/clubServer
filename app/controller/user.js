'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async allUsers() {
    this.ctx.body = await this.ctx.model.User.findOne();
  }
}

module.exports = UserController;
