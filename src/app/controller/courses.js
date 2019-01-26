'use strict';
module.exports = app => {
  const Controller = require('egg').Controller;

  class CoursesController extends Controller {
    constructor(ctx) {
      super(ctx);
    }

    async allCourses(ctx) {
      let result = {},
        courses,
        date;
      courses = await ctx.service.course.allCourses();
      courses.forEach(val => {
        date = new Date(+val.coursetime);
        val.dataValues.time = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
        val.dataValues.year = date.getFullYear();
        val.dataValues.month = date.getMonth() + 1;
      });
      result.list = courses;
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
