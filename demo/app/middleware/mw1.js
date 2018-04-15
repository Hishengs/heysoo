module.exports = async (ctx, next) => {
  console.log('this is mw1', ctx.middleware.options);
  await next();
};
