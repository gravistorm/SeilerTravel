const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:navController');

function navController (dbConfig) {
  function checkUser (req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  }

  function insertNewLink (req, res) {
    let client;
    (async () => {
      try {
        const link = req.body;

        client = await MongoClient.connect(dbConfig.url, { useNewUrlParser: true });
        const db = await client.db(dbConfig.dataB);
        const col = await db.collection('link');

        const result = await col.insertOne(link);
        client.close();
        if (result) {
          res.json(link._id);
        } else {
          res.json('Error creating a link');
        }
      } catch (err) {
        debug(err.stack);
      }
    })();
  }

  function getLinks (req, res) {
    let client;
    (async () => {
      try {
        client = await MongoClient.connect(dbConfig.url, {useNewUrlParser: true});
        const db = await client.db(dbConfig.dataB);
        const col = await db.collection('link');

        const users = await col.find().sort({position: 1}).toArray();
        client.close();

        if (users) {
          res.json(users);
        } else {
          res.send('No links in data base');
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
        const col = await db.collection('link');

        const user = await col.findOne({_id: ObjectID(id)});
        client.close();

        if (user) {
          res.json(user);
        } else {
          res.send('No link in data base, please check id');
        }
      } catch (err) {
        debug(err.stack);
      }
    })();
  }

  function updateLink (req, res) {
    let client;
    (async () => {
      try {
        const id = req.params.id;
        const data = req.body;
        delete data._id;

        client = await MongoClient.connect(dbConfig.url, { useNewUrlParser: true });
        const db = await client.db(dbConfig.dataB);
        const col = await db.collection('link');

        const r = await col.updateOne({_id: ObjectID(id)}, {$set: data});
        client.close();

        res.json('Link modified successfully');
        debug(`Link updated successfully ${r.modifiedCount}`);
      } catch (err) {
        debug(err.stack);
      }
    })();
  }

  function removeLink (req, res) {
    let client;
    (async () => {
      try {
        const id = req.params.id;

        client = await MongoClient.connect(dbConfig.url, { useNewUrlParser: true });
        const db = await client.db(dbConfig.dataB);
        const col = await db.collection('link');

        const r = await col.deleteOne({_id: ObjectID(id)});
        client.close();

        res.json('Link deleted successfully');
        debug(`link deleted ${r.deletedCount}`);
      } catch (err) {
        debug(err.stack);
      }
    })();
  }

  return {
    checkUser,
    insertNewLink,
    getLinks,
    getOne,
    updateLink,
    removeLink
  };
}

module.exports = navController;
