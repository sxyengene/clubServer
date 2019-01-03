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

    async new(ctx){
      let query = ctx.query;
      let user,result;
      console.log(`query.name = ${query.name}, query.password = ${query.password}`);
      if( !! query.name && !!query.password && !!query.department && !!query.nickname){
        user = await ctx.service.user.findByName(query.name);
        console.log(`user=${user}`);
        if(user == null){
          result = await ctx.service.user.upsertUser(query);
          if(!!result){
            ctx.body = 'success';
            return;
          }
        }
      }
    }

    async edit(ctx){
      let query = ctx.query;
      let user,result;
      console.log(`query.name = ${query.name}, query.password = ${query.password}`);
      if( !! query.name && !!query.password && !!query.department && !!query.nickname){
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
  }

  return UsersController
}