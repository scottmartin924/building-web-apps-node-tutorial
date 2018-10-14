const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookRoutes');

const bookRouter = express.Router();

const url = 'mongodb://localhost:27017';
const dbName = 'booksDb';

// Function returned as a router so can pass variables in (e.g. shared variables between routes)
function router(nav) {
  // Ensure logged in before allowing navigation to books
  bookRouter.use((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  });

  // At root of book router (which is at books) return string
  bookRouter.route('/')
    .get((req, res) => {
      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected to server');

          const db = client.db(dbName);
          const col = await db.collection('books');

          const books = await col.find().toArray();
          res.render('bookListView',
            {
              nav, // This is object destructuring...can just use variable and creates field called 'variableName' with value of variable
              books,
              title: 'Library',
            });
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });

  // Use id of book as route parameter
  bookRouter.route('/:id')
    .get((req, res) => {
      // This is object destructuring...basically the {} says look for the id property in the object on the right
      const { id } = req.params;
      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected to server');

          const db = client.db(dbName);
          const col = await db.collection('books');
          const book = await col.findOne({ _id: new ObjectID(id) });
          debug(book);
          res.render('bookView', {
            nav,
            book,
            title: 'Library',
          });
        } catch (err) {
          debug(err.stack);
        }
      }());
    });

  return bookRouter;
}

module.exports = router;
