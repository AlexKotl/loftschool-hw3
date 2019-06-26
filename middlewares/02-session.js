const session = require('express-session');
module.exports = session({
  key: 'user_sid',
  secret: 'loft school',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
})
