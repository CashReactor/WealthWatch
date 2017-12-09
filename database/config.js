const mongoose = require('mongoose');
<<<<<<< HEAD:database/config.js
=======
// mongoose.Promise = require('bluebird');
>>>>>>> Rebase for configuring dotenv in database:database/index.js
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
