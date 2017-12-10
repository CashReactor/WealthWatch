const mongoose = require('mongoose');
require('dotenv').config();
// mongoose.Promise = require('bluebird');

const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds135926.mlab.com:35926/wealthwatch`;

mongoose
  .connect(uri, {
    userMongoClient: true
    // promiseLibrary: require('bluebird')
  })
  .then(() => console.log('database connected'))
  .catch(err => {
    console.log(err);
  });