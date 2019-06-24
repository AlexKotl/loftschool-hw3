const fs = require('fs');
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

// include middlewares
const list = fs.readdirSync('./middlewares').sort();
list.forEach(file => {
  // easier way to pass app var ???
  if (file === '02-koa-session.js') {
    app.use(require(`./middlewares/${file}`)(app));
  }
  else {
    app.use(require(`./middlewares/${file}`));
  }
});

const router = require('./router');
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Server running on localhost:3000');
});
