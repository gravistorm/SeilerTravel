const express = require('express');
const debug = require('debug')('app');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { MongoClient } = require('mongodb');

const dbConfig = {
  dataB: 'SeilerTravel',
  url: 'mongodb://localhost:27017'
};

let app = express();
let port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'SeilerTravel',
  resave: false,
  saveUninitialized: false
}));

require('./config/passport')(app, dbConfig);

const loginRouter = require('./src/admin/routes/loginRouter')(dbConfig);
const userRouter = require('./src/admin/routes/userRouter')(dbConfig);
const navRouter = require('./src/admin/routes/navRouter')(dbConfig);

app.use('/admin', loginRouter);
app.use('/admin/navigation', navRouter);
app.use('/admin/user', userRouter);

app.get('/books', async (req, res) => {
  let url = 'mongodb://localhost:27017';
  let client;
  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true });
    let db = await client.db('libraryApp');
    let coll = await db.collection('books');

    let books = await coll.find().toArray();
    res.json(books);
    client.close();
  } catch (err) {
    debug(err.stack);
  }
});

app.listen(port, () => {
  debug(`listening to port ${port}`);
});
