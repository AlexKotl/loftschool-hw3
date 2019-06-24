const session = require('koa-session');
module.exports = (app) => session({
  key: 'koa:sess',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: false,
  rolling: false,
  renew: true
}, app);
