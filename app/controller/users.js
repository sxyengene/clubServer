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

    async new(){
      let params = ctx.params;
      let user,result;
      if( !! params.name && !!params.password){
        user = await ctx.service.user.findById(params.name);
        if(user === null){
          result = await ctx.service.user.addUser(params);
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