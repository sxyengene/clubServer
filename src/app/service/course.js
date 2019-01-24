const Service = require('egg').Service;
class CourseService extends Service {
  // 默认不需要提供构造函数。
  // constructor(ctx) {
  //   super(ctx); 如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
  //   // 就可以直接通过 this.ctx 获取 ctx 了
  //   // 还可以直接通过 this.app 获取 app 了
  // }

  async allCourses() {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const courses = await this.ctx.model.Course.findAll();
    return courses;
  }
  //
  // async findByName(name) {
  //   console.log('findByName');
  //   const user = await this.ctx.model.User.findOne({ where: { name } });
  //   return user;
  // }
  //
  // async findByOpenid(openid) {
  //   console.log('findByName');
  //   const user = await this.ctx.model.User.findOne({ where: { openid } });
  //   return user;
  // }
  //
  // async upsertUser(params) {
  //   const user = await this.ctx.model.User.upsert(params);
  //   return user;
  // }

}
module.exports = CourseService;
