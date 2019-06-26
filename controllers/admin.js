const skillsCtrl = require('./skills');
const productsCtrl = require('./products');

exports.renderAdmin = async (req, res) => {
  try {
    if (!req.session.isAuth) {
      res.redirect('/login');
    }

    const skills = await skillsCtrl.get();

    res.render('admin', {
      skills,
      //message: req.flash('message') != '' ? req.flash('message') : null
    });
  } catch (error) {
    console.error(error);
  }
};

exports.submitSkills = async (req, res) => {
  try {
    if (!req.session.isAuth) {
      res.redirect('/login');
    }

    await skillsCtrl.set({ ...req.body });
    req.flash('message', 'Skills saved');

    res.redirect('/admin');
  } catch (error) {
    console.error(error);
  }
};

exports.submitProduct = async (req, res) => {
  try {
    if (!req.session.isAuth) {
      res.redirect('/login');
    }

    await productsCtrl.add({ ...req.body, ...req.files });
    req.flash('message2', 'New product added');
    res.redirect('/admin');
  } catch (error) {
    console.error(error);
  }
};
