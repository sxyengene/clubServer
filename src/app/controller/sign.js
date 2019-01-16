'use strict';

const Controller = require('egg').Controller;

class SignController extends Controller {
	async sign() {
		this.ctx.body = {
			errorCode:200
		};
	}
}

module.exports = SignController;
