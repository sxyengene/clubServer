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

      let userids = [],
        result = [],
        date,
        userObj = {};
      /*填装result ctime content*/
      const comment = await ctx.service.comment.findByCourseId(query.courseid);
      for (const item of comment) {
        userids.push(item.userid);
        date = new Date(+item.commenttime);
        result.push({
          content: item.content,
          userid: item.userid,
          ctime: ctx.helper.formatDate(date),
        });
      }
      /*查用户转成Obj*/
      const users = await ctx.service.user.findByIds(userids);
      for (const item of users) {
        userObj[item.id] = item.name;
      }
      /*对result 对应id 赋值对应 name*/
      for (const item of result) {
        item.name = userObj[item.userid];
      }

      if (result.length) {
        ctx.body = result;
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
      if (!user) {
        ctx.status = 417;
        ctx.body = 'no user';
        return;
      }

      const hasCourse = await ctx.service.course.findByCourseid(query.courseid);
      // 无课程
      if (!hasCourse) {
        ctx.body = 'no course';
        ctx.status = 417;
        return;
      }

      const upsertData = {
        valid: 1,
        courseid: query.courseid,
        content: query.content,
        commenttime: new Date().getTime(),
        userid: user.id,
      };

      await ctx.service.comment.upsertComment(upsertData);
      ctx.body = 'success';
      ctx.status = 200;
    }
  }
  return CommentController;
};
