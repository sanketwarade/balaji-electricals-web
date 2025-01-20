const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const pool = require('./db');

const sessionStore = new MySQLStore({}, pool);

module.exports = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'None',
  },
});
