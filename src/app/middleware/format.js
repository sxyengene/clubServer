module.exports = (options,app) => {
  return async function format(ctx, next) {
    await next();
    ctx.body = Object.assign({
      errorCode:ctx.status
    },{
      result:ctx.body
    });
  }
};