const express = require('express');
const passport = require('passport');

const loginRouter = express.Router();

function router (dbConfig) {
  loginRouter.route('/')
    .post(passport.authenticate('local'), (req, res) => {
      if (req.user) {
        res.json(req.user);
      } else {
        res.status(401);
      }
    });

  return loginRouter;
}

module.exports = router;
