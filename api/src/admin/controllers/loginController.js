const { MongoClient } = require('mongodb');
const debug = require('debug')('app:loginController');

function loginController (dbConfig) {
  function login (req, res) {
    const { username, password } = req.body;
    let client;

    (async () => {
      try {
        client = await MongoClient.connect(dbConfig.url, { useNewUrlParser: true });
        const db = await client.db(dbConfig.dataB);
        const col = await db.collection('user');
        const user = {
          username,
          password
        };

        const result = await col.findOne({
          username: user.username,
          password: user.password,
          status: true
        });

        client.close();
        if (result) {
          res.json(result);
        } else {
          res.send('No User');
        }
      } catch (err) {
        debug(err.stack);
      }
    })();
  }

  return {
    login
  };
}

module.exports = loginController;
