const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminController');

const url = 'mongodb://localhost:27017';
const dbName = 'booksDb';

const books = [
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Nilolayevich Tolstoy',
    read: false
  },
  {
    title: 'Catch-22',
    genre: 'Historical Fiction',
    author: 'Joseph Heller',
    read: true
  },
  {
    title: 'A Brief History of Time',
    genre: 'Nonfiction',
    author: 'Stephen Hawking',
    read: false
  },
  {
    title: "Hitchhiker's Guide to the Galaxy",
    genre: 'Science Fiction',
    author: 'Douglas Adams',
    read: true
  },
  {
    title: 'Great Expectations',
    genre: 'Historical Fiction',
    author: 'Charles Dickens',
    read: false
  },
];

function adminController() {
  function insertToDb(req, res) {
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected to server');

        const db = client.db(dbName);
        const response = await db.collection('books').insertMany(books);
        res.json(response);
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  }

  return {
    insertToDb
  };
}

module.exports = adminController;
