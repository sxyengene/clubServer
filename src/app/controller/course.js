'use strict';
module.exports = (app)=>{
  const Controller = require('egg').Controller;

  class CoursesController extends Controller {
    async allCourses() {
      let result = await this.ctx.model.Course.findAll();
      this.ctx.body = result;
    }
  }
  return CoursesController;
};
