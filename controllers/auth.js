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

exports.loginUser = async (req, res) => {
  try {
    await exports.auth(req.body.email, req.body.password);
    req.session.isAuth = true;
    res.redirect('/admin');
  } catch (error) {
    req.flash('message', error.message);
    res.redirect('/login');
  }
};

exports.renderLoginForm = async (req, res) => {
  try {
    if (req.session.isAuth) {
      res.redirect('/admin');
    }

    res.render('login', {
      message: req.flash('message') != '' ? req.flash('message') : null,
      message2: req.flash('message2') != '' ? req.flash('message2') : null
    });
  } catch (error) {
    console.error(error);
  }
};
