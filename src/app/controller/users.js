'use strict';
module.exports = app => {
  const Controller = require('egg').Controller;
  const sxyConfig = require('../../config/config.sxy.js');

  class UsersController extends Controller {
    constructor(ctx) {
      super(ctx);
    }

    async allUsers() {
      this.ctx.body = await this.ctx.model.User.findAll({});
    }

	  async index(ctx) {
      console.log(ctx.params.id);
    }

    async show(ctx) {
      let user;
      if (ctx.query.id) {
        user = await ctx.service.user.findById(ctx.query.id);
        if (user) {
          let userObj = {
            name:user.name,
            department:user.department,
            nickname:user.nickname,
          };
          ctx.body = userObj;
          return;
        }
      }else{
        ctx.status = 417;
        ctx.body = 'no id';
      }
    }

    async findByName(ctx) {
      let user;
      if (ctx.query.name) {
        user = await ctx.service.user.findByName(ctx.query.name);
        if (user) {
          ctx.body = user;
          return;
        }
      }
    }

    /* 注册*/
    async signUp(ctx) {
      let user,
        result,
        query = ctx.query;
      const rule = {
        name: { type: 'string', required: true, message: 'name is necessary' },
        password: { type: 'string', required: true, message: 'password is necessary' },
        department: { type: 'string', required: true, message: 'department is necessary' },
        nickname: { type: 'string', required: true, message: 'nickname is necessary' },
      };

      try {
        await ctx.validate(rule, query);
      } catch (e) {
        ctx.body = e;
      }

      user = await ctx.service.user.findByName(query.name);
      if (user == null) {
        const password = ctx.helper.encrypt(query.password);
        query.password = password;
        result = await ctx.service.user.upsertUser(query);
        if (result) {
          ctx.body = 'success';
          return;
        }
      }
    }

    async wxlogin(ctx) {
      /* signed 是否已注册在数据库中*/
      let user,
        signed = false,
        loginQuery = ctx.query;
      const rule = {
        jscode: { type: 'string', required: true, message: 'jscode is necessary' },
      };

      try {
        await ctx.validate(rule, loginQuery);

      } catch (e) {
        ctx.status = 400;
        ctx.body = e;
        return;
      }

      const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${sxyConfig.appid}&secret=${sxyConfig.secret}&js_code=${loginQuery.jscode}&grant_type=authorization_code`;
      const result = await ctx.curl(url, {
        // 自动解析 JSON response
        dataType: 'json',
        // 3 秒超时
        timeout: 3000,
      });

      if (result.data.openid) {
        user = await ctx.service.user.findByOpenid(result.data.openid);
        if (user) {
          signed = true;
        }
      }

      ctx.status = result.status;
      ctx.set(result.headers);
      ctx.body = Object.assign(result.data, { signed });
    }

    /* 登录*/
    async signIn(ctx) {
      let user,
        result,
        signInMsg = ctx.query;
      const rule = {
        name: { type: 'string', required: true, message: 'name is necessary' },
        password: { type: 'string', required: true, message: 'password is necessary' },
      };

      try {
        await ctx.validate(rule, signInMsg);
      } catch (e) {
        ctx.body = e;
      }

      const token = ctx.cookies.get('token');
      user = await ctx.service.user.findByName(signInMsg.name);
      if (!user) {
        ctx.body = 'bad password or not signed';
        return;
      }
      console.log(`signInMsg=${ctx.helper.encrypt(signInMsg.password)}`);
      console.log(`user.password=${user.password}`);
      /* 密码验证通过*/
      if (ctx.helper.encrypt(signInMsg.password) == user.password) {
        const lastvisit = new Date();
        const expires = new Date(lastvisit.getTime() + 2 * 60 * 10 * 1000);
        const token = ctx.helper.encrypt(user.id.toString() + user.name.toString());
        ctx.cookies.set('token', token, {
          expires,
          signed: true,
        });
        ctx.service.user.upsertUser({ id: user.id, lastvisit: lastvisit.getTime(), token });
        ctx.body = 'login success';
      } else {
        ctx.body = 'bad password or not signed';
      }
    }

    async signOut(ctx) {
      ctx.cookies.set('token', '');
      ctx.body = 'success';
    }

    async edit(ctx) {
      const query = ctx.query;
      let user,
        result;
      const rule = {
        department: { type: 'string', required: true, message: 'department is necessary' },
        nickname: { type: 'string', required: true, message: 'nickname is necessary' },
      };

      try {
        await ctx.validate(rule, query);
      } catch (e) {
        ctx.body = e;
      }
      const isLogin = await ctx.service.user.isLogin();

      if (!isLogin) {
        ctx.body = 'not logined';
        return;
      }

      user = await ctx.service.user.findByName(query.name);
      if (user != null) {
        await ctx.service.user.upsertUser({ id: user.id, department: query.department, nickname: query.nickname });
        ctx.body = 'success';
        return;
      }
    }


    async submitWxInfo(ctx) {
      let user,
        result,
        query = ctx.query;
      const rule = {
        name: { type: 'string', required: true, message: 'name is necessary' },
        nickname: { type: 'string', required: true, message: 'nickname is necessary' },
        department: { type: 'string', required: true, message: 'department is necessary' },
        openid: { type: 'string', required: true, message: 'openid is necessary' },
      };

      try {
        await ctx.validate(rule, query);
      } catch (e) {
        ctx.status = 400;
        ctx.body = e;
        return;
      }

      result = await ctx.service.user.upsertUser(query);
      if (result) {
        ctx.status = 200;
        ctx.body = 'success';
        return;
      }
      // 用户已存在
      ctx.status = 400;
      ctx.body = 'fail';
      return;

    }
  }

  return UsersController;
};
