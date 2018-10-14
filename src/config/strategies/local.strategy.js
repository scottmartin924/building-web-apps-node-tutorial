const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:local-strategy');

const url = 'mongodb://localhost:27017';
const dbName = 'booksDb';

module.exports = function localStrategy() {
  passport.use(new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    }, (username, password, done) => {
      (async function authUser() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected to server');
          const db = client.db(dbName);
          const col = db.collection('user');
          // Object destructuring here to get username: username
          const user = await col.findOne({ username });

          // Check if password matches
          if (user.password === password) {
            done(null, user);
          } else {
            done(null, false);
          }
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    }
  ));
};
