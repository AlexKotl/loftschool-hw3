const Koa = require('koa');
const app = new Koa();

const Pug = require('koa-pug');
const pug = new Pug({
  viewPath: './views/pages',
  basedir: './view/pages',
  pretty: true,
  noCache: true,
  app: app
});

const koaStatic = require('koa-static');
app.use(koaStatic('./public'));

const session = require('koa-session');
app.use(session({
  key: 'koa:sess',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: false,
  rolling: false,
  renew: true
}, app));

const flash = require('koa-flash-simple');
app.use(flash());

const koaBody = require('koa-body');
app.use(koaBody({
  formidable: {
    uploadDir: './public/assets/img/products/'
  },
  multipart: true
}));

const router = require('./router');
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Server running on localhost:3000');
});
