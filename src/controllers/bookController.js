const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookController');

const url = 'mongodb://localhost:27017';
const dbName = 'booksDb';

function bookController(nav, bookService) {
  function getIndex(req, res) {
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
  }


  function getById(req, res) {
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
        book.details = await bookService.getBookById(book.bookId);
        res.render('bookView', {
          nav,
          book,
          title: 'Library',
        });
      } catch (err) {
        debug(err.stack);
      }
    }());
  }

  function middleware(req, res, next) {
    // if (req.user) {
    next();
    // } else {
    //   res.redirect('/');
    // }
  }

  // Revealing module pattern (return object with the functions)
  return {
    getIndex,
    getById,
    middleware
  };
}

module.exports = bookController;
