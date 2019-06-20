const Router = require('koa-router');
const router = new Router();
const skillsCtrl = require('../controllers/skills') 

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
    const skills = await skillsCtrl.get();
    ctx.render('admin', {
      skills
    });
    console.log(skills);
    
  } catch (error) {
    console.error(error);
  }
});

router.post('/admin/skills', async (ctx) => {
  try {
    await skillsCtrl.set({...ctx.request.body});
    ctx.redirect('/admin');
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
