'use strict';

const Controller = require('egg').Controller;

class SignController extends Controller {
  constructor(ctx) {
    super(ctx);
  }

  async sign(ctx) {
  	const query = ctx.query;
    const rule = {
      openid: { type: 'string', required: true, message: 'openid is necessary' },
      courseid: { type: 'string', required: true, message: 'courseid is necessary' },
      userid: { type: 'string', required: true, message: 'userid is necessary' },
    };

    try {
      await ctx.validate(rule, query);
    } catch (e) {
      ctx.status = 1000;
      return;
    }

    const user = await ctx.service.user.findById(query);
    if (user) {
      ctx.body = user;
      return;
    }
  }
}

module.exports = SignController;
