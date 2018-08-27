const express = require('express');

const userRouter = express.Router();

function router (dbConfig) {
  const userController = require('../controllers/userController')(dbConfig);

  // userRouter.use(userController.checkUser); Use this when passport is fully configurated

  userRouter.route('/')
    .post(userController.insertNewUser)
    .get(userController.getUsers);

  userRouter.route('/:id')
    .get(userController.getOne)
    .patch(userController.updateUser)
    .delete(userController.removeUser);

  return userRouter;
}

module.exports = router;
