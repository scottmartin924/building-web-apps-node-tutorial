const express = require('express');
const bookController = require('../controllers/bookController');

const bookRouter = express.Router();

// Function returned as a router so can pass variables in (e.g. shared variables between routes)
function router(nav) {
  const { getIndex, getById, middleware } = bookController(nav);

  // Ensure logged in before allowing navigation to books
  bookRouter.use(middleware);

  // At root of book router (which is at books) return string
  bookRouter.route('/')
    .get(getIndex);

  // Use id of book as route parameter
  bookRouter.route('/:id')
    .get(getById);

  return bookRouter;
}

module.exports = router;
