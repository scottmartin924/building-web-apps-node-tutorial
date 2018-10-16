const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authController');
const passport = require('passport');


const url = 'mongodb://localhost:27017';
const dbName = 'booksDb';

function authController(nav) {
  function signUp(req, res) {
    const { username, password } = req.body;

    (async function addUser() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected to server');
        const db = client.db(dbName);
        const col = db.collection('user');
        const user = { username, password };
        const result = await col.insertOne(user);
        debug(result);
        // create user
        // login the user (req.login comes from passport)-basically login with the user then redirect to auth/profile
        req.login(result.ops[0], () => {
          res.redirect('/auth/profile');
        });
      } catch (err) {
        debug(err.stack);
      }
    }());
  }

  function signInGet(req, res) {
    res.render('signin', {
      nav,
      title: 'signin'
    });
  }

  function signInPost() {
    debug('signin post');
    passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/'
    });
  }

  function profileMiddleware(req, res, next) {
    debug('profile middleware');
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  }

  function profileGet(req, res) {
    debug('profile get');
    res.json(req.user);
  }

  return {
    signUp,
    signInGet,
    signInPost,
    profileMiddleware,
    profileGet
  };
}

module.exports = authController;
