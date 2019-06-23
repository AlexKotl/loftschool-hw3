const Router = require('koa-router');
const router = new Router();
const skillsCtrl = require('../controllers/skills') 
const productsCtrl = require('../controllers/products') 
const authCtrl = require('../controllers/auth') ;

router.get('/', async (ctx) => {
  try {
    ctx.render('index', {
      skillsData: await skillsCtrl.get(),
      products: await productsCtrl.get()
    });
  } catch (error) {
    console.error(error);
  }
});

router.get('/login', async (ctx) => {
  try {
    if (ctx.session.isAuth) {
      ctx.redirect('/admin');
    }
    
    ctx.render('login');
  } catch (error) {
    console.error(error);
  }
});

router.post('/login', async (ctx) => {
  try {
    await authCtrl.auth(ctx.request.body.email, ctx.request.body.password);
    ctx.session.isAuth = true;
    ctx.redirect('/admin');
  } catch (error) {
    console.error(error);
  }
});

router.get('/admin', async (ctx) => {
  try {
    if (!ctx.session.isAuth) {
      ctx.redirect('/login');
    }

    const skills = await skillsCtrl.get();
    ctx.render('admin', {
      skills
    });
    
  } catch (error) {
    console.error(error);
  }
});

router.post('/admin/skills', async (ctx) => {
  try {
    if (!ctx.session.isAuth) {
      ctx.redirect('/login');
    }

    await skillsCtrl.set({ ...ctx.request.body });
    ctx.redirect('/admin');
  } catch (error) {
    console.error(error);
  }
});

router.post('/admin/upload', async (ctx) => {
  try {
    if (!ctx.session.isAuth) {
      ctx.redirect('/login');
    }

    await productsCtrl.add({ ...ctx.request.body, ...ctx.request.files });
    ctx.redirect('/admin');
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
