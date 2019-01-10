'use strict';
module.exports = (app) => {
  const Controller = require('egg').Controller;

  class UsersController extends Controller {
    constructor(ctx){
      super(ctx);
    }

	  async allUsers() {
		  this.ctx.body = await this.ctx.model.User.findAll({});
	  }

	  async index(){
      console.log(ctx.params.id);
    }
	  
    async show(ctx){
      let user;
      if(!!ctx.params.id){
        user = await ctx.service.user.findById(ctx.params.id);
        if(!!user){
          ctx.body = user;
          return;
        }
      }
    }

    async findByName(ctx){
      let user;
      if(!!ctx.query.name){
        user = await ctx.service.user.findByName(ctx.query.name);
        if(!!user){
          ctx.body = user;
          return;
        }
      }
    }
    
    /*注册*/
    async signUp(ctx){
      let user,result,query = ctx.query;
      const rule = {
        name:{type:'string', required:true,message:'name is necessary'},
        password:{type:'string', required:true,message:'password is necessary'},
        department:{type:'string', required:true,message:'department is necessary'},
        nickname:{type:'string', required:true,message:'nickname is necessary'},
      }

      try{
        await ctx.validate(rule, query);
      }catch(e){
        ctx.body = e;
      }

      user = await ctx.service.user.findByName(query.name);
      if(user == null){
        var password = ctx.helper.encrypt(query.password);
        query.password = password;
        result = await ctx.service.user.upsertUser(query);
        if(!!result){
          ctx.body = 'success';
          return;
        }
      }
    }
  
    
    /*登录*/
    async signIn(ctx){
      let user,result,signInMsg = ctx.query;
      const rule = {
        name:{type:'string', required:true,message:'name is necessary'},
        password:{type:'string', required:true,message:'password is necessary'},
      }

      try{
        await ctx.validate(rule,signInMsg);
      }catch(e){
        ctx.body = e;
      }

      var token = ctx.cookies.get('token');
      user = await ctx.service.user.findByName(signInMsg.name);
      /*密码验证通过*/
      if(ctx.helper.encrypt(signInMsg.password) == user.password){
        let lastvisit = new Date();
        let expires = new Date(lastvisit.getTime() + 2 * 60 *60 *1000 );
        let token = ctx.helper.encrypt(user.id.toString() + user.name.toString());
        ctx.cookies.set('token',ctx.helper.encrypt(user.name),{
          expires:expires,
          signed:true,
        });
        ctx.service.user.upsertUser({id:user.id,lastvisit:lastvisit.getTime(),token:token});
        ctx.body = 'login success';
      }else{
        ctx.body = 'bad password';
      }
    }

    async edit(ctx){
      let query = ctx.query;
      let user,result;
      const rule = {
        name:{type:'string', required:true,message:'name is necessary'},
        password:{type:'string', required:true,message:'password is necessary'},
        department:{type:'string', required:true,message:'department is necessary'},
        nickname:{type:'string', required:true,message:'nickname is necessary'},
      }

      try{
        await ctx.validate(rule, query);
      }catch(e){
        ctx.body = e;
      }
      var isLogin = await ctx.service.user.isLogin();
      
      console.log(`isLogin=${isLogin}`);
      if(!!isLogin){
        ctx.body = 'logined'
      }else{
        ctx.body = 'not logined'
      }
      return;



      user = await ctx.service.user.findByName(query.name);
      console.log(`user=${user}`);
      if(user != null){
        result = await ctx.service.user.upsertUser(query);
        if(!!result){
          ctx.body = 'success';
          return;
        }
      }
    }
  }

  return UsersController
}