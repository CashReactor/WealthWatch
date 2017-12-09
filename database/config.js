const mongoose = require('mongoose');
// mongoose.Promise = require('bluebird');

const uri = 'mongodb://localhost/wealthWatch';

mongoose
  .connect(uri, {
    userMongoClient: true
    // promiseLibrary: require('bluebird')
  })
  .then(() => console.log('database connected'))
  .catch(err => {
    console.log(err);
  });