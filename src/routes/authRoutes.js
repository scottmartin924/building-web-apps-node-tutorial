const express = require('express');
const authController = require('../controllers/authController');


const authRouter = express.Router();

function router(nav) {
  const {
    signUp, signInGet, signInPost, profileGet, profileMiddleware
  } = authController(nav);

  authRouter.route('/signUp')
    .post(signUp);

  authRouter.route('/signin')
    .get(signInGet)
    // Use local strategy (local.strategy.js)
    .post(signInPost);

  authRouter.route('/profile')
    // For all calls validate logged in (if req.user)
    .all(profileMiddleware)
    .get(profileGet);

  return authRouter;
}

module.exports = router;
