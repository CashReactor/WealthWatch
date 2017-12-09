const mongoose = require('mongoose');
<<<<<<< HEAD
// mongoose.Promise = require('bluebird');

=======
<<<<<<< HEAD:database/config.js
=======
// mongoose.Promise = require('bluebird');
>>>>>>> Rebase for configuring dotenv in database:database/index.js
>>>>>>> Rebase for configuring dotenv in database
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
