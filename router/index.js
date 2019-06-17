const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx) => {
  try {
    ctx.render('index');
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;