const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx) => {
  try {
    ctx.render('index');
  } catch (error) {
    console.error(error);
  }
});

router.get('/login', async (ctx) => {
  try {
    ctx.render('login');
  } catch (error) {
    console.error(error);
  }
});

router.get('/admin', async (ctx) => {
  try {
    ctx.render('admin');
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
