const Router = require('koa-router');
const router = new Router();
const authCtrl = require('../controllers/auth');
const adminCtrl = require('../controllers/admin');
const contactsCtrl = require('../controllers/contacts');
const homepageCtrl = require('../controllers/homepage');

router.get('/', homepageCtrl.renderHomepage);
router.post('/', contactsCtrl.submitContact);
router.get('/login', authCtrl.renderLoginForm);
router.post('/login', authCtrl.loginUser);
router.get('/admin', adminCtrl.renderAdmin);
router.post('/admin/skills', adminCtrl.submitSkills);
router.post('/admin/upload', adminCtrl.submitProduct);

module.exports = router;
