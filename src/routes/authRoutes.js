const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');

const authRouter = express.Router();

const url = 'mongodb://localhost:27017';
const dbName = 'booksDb';

function router(nav) {
  authRouter.route('/signUp')
    .post((req, res) => {
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
    });

  authRouter.route('/signin')
    .get((req, res) => {
      res.render('signin', {
        nav,
        title: 'signin'
      });
    })
    // Use local strategy (local.strategy.js)
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/'
    })); // When signing in just authenitcate with passport

  authRouter.route('/profile')
    // For all calls validate logged in (if req.user)
    .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      res.json(req.user);
    });

  return authRouter;
}

module.exports = router;
