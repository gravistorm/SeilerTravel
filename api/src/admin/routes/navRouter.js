const express = require('express');

const navRouter = express.Router();

function router (dbConfig) {
  const navController = require('../controllers/navController')(dbConfig);

  // navRouter.use(navController.checkUser); Use this when passport is fully configurated

  navRouter.route('/')
    .post(navController.insertNewLink)
    .get(navController.getLinks);

  navRouter.route('/:id')
    .get(navController.getOne)
    .patch(navController.updateLink)
    .delete(navController.removeLink);

  return navRouter;
}

module.exports = router;
