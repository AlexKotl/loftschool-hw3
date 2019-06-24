const { config } = require('../config');

exports.auth = (login, password) => new Promise(async (resolve, reject) => {
  try {
    console.log(config);

    if (login === config.login && password === config.password) {
      resolve();
    }

    reject(new Error('Incorrect credentials'));
  } catch (error) {
    reject(error);
  }
});

exports.loginUser = async (ctx) => {
  try {
    await exports.auth(ctx.request.body.email, ctx.request.body.password);
    ctx.session.isAuth = true;
    ctx.redirect('/admin');
  } catch (error) {
    ctx.flash.set({ message: error.message });
    ctx.redirect('/login');
  }
}

exports.renderLoginForm = async (ctx) => {
  try {
    if (ctx.session.isAuth) {
      ctx.redirect('/admin');
    }

    ctx.render('login', {
      message: ctx.flash.get() ? ctx.flash.get().message : null,
      message2: ctx.flash.get() ? ctx.flash.get().message2 : null
    });
  } catch (error) {
    console.error(error);
  }
}