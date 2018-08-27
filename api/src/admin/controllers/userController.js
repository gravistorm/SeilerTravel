const { MongoClient, ObjectId } = require('mongodb');
const debug = require('debug')('app:userController');

function userController (dbConfig) {
  function checkUser (req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  }

  function insertNewUser (req, res) {
    let client;
    (async () => {
      try {
        const user = req.body;

        client = await MongoClient.connect(dbConfig.url, { useNewUrlParser: true });
        const db = await client.db(dbConfig.dataB);
        const col = await db.collection('user');

        const result = await col.insertOne(user);
        client.close();

        if (result) {
          res.json(result);
        } else {
          res.send('Error creating an user');
        }
      } catch (err) {
        debug(err.stack);
      }
    })();
  }

  function getUsers (req, res) {
    let client;
    (async () => {
      try {
        client = await MongoClient.connect(dbConfig.url, {useNewUrlParser: true});
        const db = await client.db(dbConfig.dataB);
        const col = await db.collection('user');

        const users = await col.find().toArray();
        client.close();

        if (users) {
          res.json(users);
        } else {
          res.send('No user in data base');
        }
      } catch (err) {
        debug(err.stack);
      }
    })();
  }

  function getOne (req, res) {
    let client;
    (async () => {
      try {
        const id = req.params.id;

        client = await MongoClient.connect(dbConfig.url, { useNewUrlParser: true });
        const db = await client.db(dbConfig.dataB);
        const col = await db.collection('user');

        const user = await col.findOne({_id: ObjectId(id)});
        client.close();

        if (user) {
          res.json(user);
        } else {
          res.send('No user in data base, please check id');
        }
      } catch (err) {
        debug(err.stack);
      }
    })();
  }

  function updateUser (req, res) {
    let client;
    (async () => {
      try {
        const id = req.params.id;
        const data = req.body;

        client = await MongoClient.connect(dbConfig.url, { useNewUrlParser: true });
        const db = await client.db(dbConfig.dataB);
        const col = await db.collection('user');

        const r = await col.updateOne({_id: ObjectId(id)}, {$set: data});
        client.close();

        res.send('User modified successfully');
        debug(r.modifiedCount);
      } catch (err) {
        debug(err.stack);
      }
    })();
  }

  function removeUser (req, res) {
    let client;
    (async () => {
      try {
        const id = req.params.id;

        client = await MongoClient.connect(dbConfig.url, { useNewUrlParser: true });
        const db = await client.db(dbConfig.dataB);
        const col = await db.collection('user');

        const r = await col.deleteOne({_id: ObjectId(id)});
        client.close();

        res.send('User deleted successfully');
        debug(`user deleted ${r.deletedCount}`);
      } catch (err) {
        debug(err.stack);
      }
    })();
  }

  return {
    checkUser,
    insertNewUser,
    getUsers,
    getOne,
    updateUser,
    removeUser
  };
}

module.exports = userController;
