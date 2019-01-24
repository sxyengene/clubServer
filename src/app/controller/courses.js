'use strict';
module.exports = app => {
  const Controller = require('egg').Controller;

  class CoursesController extends Controller {
    constructor(ctx) {
      super(ctx);
    }

    async allCourses(ctx) {
      let result = {};
      result.list  = await ctx.service.course.allCourses();
      this.ctx.body = result;
    }

    // async allCourses(ctx) {
    //   let query = ctx.query,user;
    //   if(query.openid){
    //     user = await ctx.service.user.findByOpenid(query.openid);
    //     if(user){
    //       let result = {};
    //       result.list  = await ctx.service.course.allCourses();
    //       this.ctx.body = result;
    //     }else{
    //       ctx.body = 'need login';
    //       return;
    //     }
    //   }else{
    //     ctx.body = 'need login';
    //     return;
    //   }
    // }
  }
  return CoursesController;
};
