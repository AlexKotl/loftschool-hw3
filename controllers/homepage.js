const skillsCtrl = require('./skills');
const productsCtrl = require('./products');

exports.renderHomepage = async (req, res) => {
  try {
    res.render('index', {
      skillsData: await skillsCtrl.get(),
      products: await productsCtrl.get(),
      //message: req.flash.get() ? req.flash.get().message : null
    });
  } catch (error) {
    console.error(error);
  }
};
