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
    };

    try {
      await ctx.validate(rule, query);
    } catch (e) {
      ctx.body = e;
      return;
    }

    const user = await ctx.service.user.findByOpenid(query.openid);
    if (user) {
      let hasCourse = await ctx.service.course.findByCourseid(query.courseid);
      //无课程
      if(!hasCourse){
        ctx.body = 'no course';
        return;
      }
      
      let hasSigned = await ctx.service.sign.findByUserAndCourse(user.id,query.courseid);
      if(hasSigned){
        //已签到
        ctx.body = 'has signed';
        return;
      }

      let signtime = new Date().getTime();
      console.log(signtime);

      let upsertData = {
        userid:user.id,
        courseid:query.courseid,
        signtime,
      }

      await ctx.service.sign.upsertSign(upsertData);
      ctx.body = 'success';
      ctx.status = 200;
      return;
    }else{
      ctx.body = 'no user';
      return;
    }
  }
}

module.exports = SignController;
