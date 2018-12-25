'use strict';

const Controller = require('egg').Controller;

class CourseController extends Controller {
  async allCourses() {
    this.ctx.body = await this.ctx.model.Course.findAll();
  }
}

module.exports = CourseController;
