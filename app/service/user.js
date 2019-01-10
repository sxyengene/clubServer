const Service = require('egg').Service;
class UserService extends Service {
  // 默认不需要提供构造函数。
  // constructor(ctx) {
  //   super(ctx); 如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
  //   // 就可以直接通过 this.ctx 获取 ctx 了
  //   // 还可以直接通过 this.app 获取 app 了
  // }
  async findById(uid) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    let user = await this.ctx.model.User.findOne({where:{id:uid}});
    return user;
  }

  async findByName(name) {
    console.log('findByName');
    let user = await this.ctx.model.User.findOne({where:{name:name}});
    return user;
  }

  async upsertUser(params){
    let user = await this.ctx.model.User.upsert(params);
    return user;
  }

  async isLogin(){
    const token = ctx.cookies.get('token');
    let user,query = ctx.query;
    console.log(123)
    if(!!query.name){
      user = await this.findByName(query.name);
      console.log(`isLoginUser=${user}`);
      console.log(`isLogintoken=${token}`);
      if(user.token == token){
        return user;
      }else{
        return false;
      }
    }


    if(token){
      user = await this.ctx.model.User.findOne({where:{token:token}});
      return user;
    }else{
      return false;
    }
  }

  async getAllInfo(uid){
    let user = await this.ctx.model.User.findOne({where:{id:uid}});
    let userInfo = await this.getAllInfo(uid);
    return userInfo;
  }

  async outOfDate(){

  }

  async isLogin(uid){
    let user = await this.findById(uid);
    if(!!user){

    }
  }
}
module.exports = UserService;