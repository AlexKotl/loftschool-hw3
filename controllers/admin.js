const skillsCtrl = require('./skills');
const productsCtrl = require('./products');

exports.renderAdmin = async (ctx) => {
  try {
    if (!ctx.session.isAuth) {
      ctx.redirect('/login');
    }

    const skills = await skillsCtrl.get();

    ctx.render('admin', {
      skills,
      message: ctx.flash.get() ? ctx.flash.get().message : null
    });
  } catch (error) {
    console.error(error);
  }
}

exports.submitSkills = async (ctx) => {
  try {
    if (!ctx.session.isAuth) {
      ctx.redirect('/login');
    }

    await skillsCtrl.set({ ...ctx.request.body });
    ctx.flash.set({ message: 'Skills saved' });
    ctx.redirect('/admin');
  } catch (error) {
    console.error(error);
  }
}

exports.submitProduct = async (ctx) => {
  try {
    if (!ctx.session.isAuth) {
      ctx.redirect('/login');
    }

    await productsCtrl.add({ ...ctx.request.body, ...ctx.request.files });
    ctx.flash.set({ message2: 'New product added' });
    ctx.redirect('/admin');
  } catch (error) {
    console.error(error);
  }
}