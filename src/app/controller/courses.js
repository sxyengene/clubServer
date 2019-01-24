'use strict';
module.exports = app => {
  const Controller = require('egg').Controller;

  class CoursesController extends Controller {
    constructor(ctx) {
      super(ctx);
    }

    async allCourses(ctx) {
      const result = await ctx.service.course.allCourses();
      this.ctx.body = result;
    }
  }
  return CoursesController;
};
