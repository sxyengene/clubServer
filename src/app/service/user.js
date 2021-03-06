const Service = require('egg').Service;

class UserService extends Service {
  // 默认不需要提供构造函数。
  // constructor(ctx) {
  //   super(ctx); 如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
  //   // 就可以直接通过 this.ctx 获取 ctx 了
  //   // 还可以直接通过 this.app 获取 app 了findById
  // }


  async findById(uid) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const user = await this.ctx.model.User.findOne({ where: { id: uid } });
    return user;
  }

  async findByIds(uids) {
    let {Op} = this.app.Sequelize;
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    if (!(uids instanceof Array)) {
      return;
    }
    const user = await this.ctx.model.User.findAll({
      where: {
        id: {
          [Op.in]: uids,
        },
      },
    });
    return user;
  }

  async findByName(name) {
    console.log('findByName');
    const user = await this.ctx.model.User.findOne({ where: { name } });
    return user;
  }

  async findByOpenid(openid) {
    console.log('findByName');
    const user = await this.ctx.model.User.findOne({ where: { openid } });
    return user;
  }

  async upsertUser(params) {
    const user = await this.ctx.model.User.upsert(params);
    return user;
  }

  async isLogin() {
    const ctx = this.ctx,
      token = ctx.cookies.get('token');
    let user,
      query = ctx.query;
    if (query.name) {
      user = await this.findByName(query.name);
      if (user.token == token) {
        return user;
      }
      return false;

    }
  }

  async getAllInfo(uid) {
    const user = await this.ctx.model.User.findOne({ where: { id: uid } });
    const userInfo = await this.getAllInfo(uid);
    return userInfo;
  }

  async outOfDate() {

  }
}
module.exports = UserService;
