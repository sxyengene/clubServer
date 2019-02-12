'use strict';
module.exports = app => {
  const Controller = require('egg').Controller;

  class CommentController extends Controller {
    constructor(ctx) {
      super(ctx);
    }

    async findByCourseId(ctx) {
      const query = ctx.query;
      const rule = {
        courseid: { type: 'string', required: true, message: 'courseid is necessary' },
      };

      try {
        await ctx.validate(rule, query);
      } catch (e) {
        ctx.status = 417;
        ctx.body = e;
        return;
      }
      const comment = await this.ctx.service.comment.findByCourseId(query.courseid);
      if (comment.length) {
        ctx.body = comment;
      } else {
        ctx.status = 417;
        ctx.body = 'no comment';
      }
    }

    async addComment(ctx) {
      const query = ctx.query;
      const rule = {
        courseid: { type: 'string', required: true, message: 'courseid is necessary' },
        openid: { type: 'string', required: true, message: 'openid is necessary' },
        content: { type: 'string', required: true, message: 'content is necessary' },
      };
      try {
        await ctx.validate(rule, query);
      } catch (e) {
        ctx.status = 417;
        ctx.body = e;
        return;
      }

      const user = await ctx.service.user.findByOpenid(query.openid);
      if(!user){
        ctx.status = 417;
        ctx.body = 'no user';
        return;
      }

      let hasCourse = await ctx.service.course.findByCourseid(query.courseid);
      //无课程
      if(!hasCourse){
        ctx.body = 'no course';
        ctx.status = 417;
        return;
      }

      let upsertData = {
        valid:1,
        courseid:query.courseid,
        content:query.content,
        commenttime: new Date().getTime(),
        userid:user.id
      }

      await ctx.service.comment.upsertComment(upsertData);
      ctx.body = 'success';
      ctx.status = 200;
    }
  }
  return CommentController;
};
