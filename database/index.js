const mongoose = require('mongoose');
// mongoose.Promise = require('bluebird');

const uri = 'mongodb://localhost/wealthWatch';

mongoose
  .connect(uri, {
    userMongoClient: true,
    // promiseLibrary: require('bluebird')
  })
  .then(() => console.log('database connected'))
  .catch(err => {
    console.log(err);
  });

let Users = new mongoose.Schema({
  /*
  put user schema here
  */
})

let User = mongoose.model('user', Users);

module.export = {

}
