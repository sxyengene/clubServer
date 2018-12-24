'use strict';

const Controller = require('egg').Controller;

class CourseController extends Controller {
  async allCourses() {
    this.ctx.body = await this.ctx.model.Course.findOne();
  }
}

module.exports = CourseController;
