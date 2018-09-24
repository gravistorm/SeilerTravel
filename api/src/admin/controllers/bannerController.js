const { MongoClient, ObjectID } = require('mongodb');
const fs = require('fs');

const debug = require('debug')('app:bannerController');

function bannerController (dbConfig) {
  function checkUser (req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  }

  function insertNewBanner (req, res) {
    let client;
    (async () => {
      try {
        let banner = req.body;
        const image = req.file;

        image.originalname = image.originalname.replace(/\s/g, '');
        banner.path = `/assets/images/banner/${image.originalname}`;

        client = await MongoClient.connect(dbConfig.url, { useNewUrlParser: true });
        const db = await client.db(dbConfig.dataB);
        const col = await db.collection('banner');

        const result = await col.insertOne(banner);
        client.close();
        if (result) {
          res.json(banner);
        } else {
          res.json('Error creating a banner');
        }
      } catch (err) {
        debug(err.stack);
      }
    })();
  }

  function getBanners (req, res) {
    let client;
    (async () => {
      try {
        client = await MongoClient.connect(dbConfig.url, {useNewUrlParser: true});
        const db = await client.db(dbConfig.dataB);
        const col = await db.collection('banner');

        const banners = await col.find().sort({position: 1}).toArray();
        client.close();

        if (banners) {
          res.json(banners);
        } else {
          res.send('No banners in data base');
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
        const col = await db.collection('banner');

        const banner = await col.findOne({_id: ObjectID(id)});
        client.close();

        if (banner) {
          res.json(banner);
        } else {
          res.json('No banner in data base, please check id');
        }
      } catch (err) {
        debug(err.stack);
      }
    })();
  }

  function updateBanner (req, res) {
    let client;
    (async () => {
      try {
        const id = req.params.id;
        const data = req.body;

        delete data._id;

        client = await MongoClient.connect(dbConfig.url, { useNewUrlParser: true });
        const db = await client.db(dbConfig.dataB);
        const col = await db.collection('banner');

        if (req.file) {
          const image = req.file;
          const banner = await col.findOne({_id: ObjectID(id)});
          const filePath = `../src${banner.path}`;

          image.originalname = image.originalname.replace(/\s/g, '');
          debug(image);
          data.path = `/assets/images/banner/${image.originalname}`;

          fs.unlink(filePath, (err) => {
            if (err) throw err;
            debug('file deleted successfully');
          });
        }

        const r = await col.updateOne({_id: ObjectID(id)}, {$set: data});

        client.close();

        if (r.modifiedCount > 0) {
          res.json('banner modified successfully');
          debug(`banner updated successfully ${r.modifiedCount}`);
        }
      } catch (err) {
        debug(err.stack);
      }
    })();
  }

  function deleteBanner (req, res) {
    let client;
    (async () => {
      try {
        const id = req.params.id;

        client = await MongoClient.connect(dbConfig.url, { useNewUrlParser: true });
        const db = await client.db(dbConfig.dataB);
        const col = await db.collection('banner');

        const banner = await col.findOne({_id: ObjectID(id)});

        const filePath = `../src${banner.path}`;
        fs.unlink(filePath, (err) => {
          if (err) throw err;
          debug('file deleted successfully');
        });

        const r = await col.deleteOne({_id: ObjectID(id)});
        client.close();

        if (r.deletedCount > 0) {
          res.json('banner deleted successfully');
          debug(`banner deleted ${r.deletedCount}`);
        }
      } catch (err) {
        debug(err.stack);
      }
    })();
  }

  return {
    checkUser,
    insertNewBanner,
    getBanners,
    getOne,
    updateBanner,
    deleteBanner
  };
}

module.exports = bannerController;
