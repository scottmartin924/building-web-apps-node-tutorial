const express = require('express');
const adminController = require('../controllers/adminController');

const adminRouter = express.Router();

function router() {
  const { insertToDb } = adminController();

  adminRouter.route('/')
    .get(insertToDb);

  // Have to remember to return the router
  return adminRouter;
}

module.exports = router;
