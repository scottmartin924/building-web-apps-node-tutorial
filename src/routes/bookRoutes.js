const express = require('express');

const bookRouter = express.Router();

// Function returned as a router so can pass variables in (e.g. shared variables between routes)
function router(nav) {
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
  // At root of book router (which is at books) return string
  bookRouter.route('/')
    .get((req, res) => {
      res.render('bookListView',
        {
          nav, // This is object destructuring...can just use variable and creates field called 'variableName' with value of variable
          books,
          title: 'Library',
        });
    });

  // Use id of book as route parameter
  bookRouter.route('/:id')
    .get((req, res) => {
      // This is object destructuring...basically the {} says look for the id property in the object on the right
      const { id } = req.params;
      res.render('bookView', {
        nav,
        book: books[id],
        title: 'Library',
      });
    });

  return bookRouter;
}

module.exports = router;
