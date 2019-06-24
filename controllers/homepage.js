const skillsCtrl = require('./skills');
const productsCtrl = require('./products');

exports.renderHomepage = async (ctx) => {
  try {
    ctx.render('index', {
      skillsData: await skillsCtrl.get(),
      products: await productsCtrl.get(),
      message: ctx.flash.get() ? ctx.flash.get().message : null
    });
  } catch (error) {
    console.error(error);
  }
};
