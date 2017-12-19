const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config('../.env');
const oneTime = require('./models/oneTime.js');
const recurring = require('./models/recurring.js');
const {User} = require('./models/user.js');

// Step 1: Drop Old Data
const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds135926.mlab.com:35926/wealthwatch`;
mongoose.connect(uri, {useMongoClient: true}, () => {
  mongoose.connection.db.dropDatabase();
});

//Step 2: Add Data from data.json
fs.readFile(path.join(`${__dirname}/data.json`), 'utf8', (err, data) => {
  if(err){
    console.log(err);
  } else {
    data = JSON.parse(data);
    const currentData = data[0]
    // console.log(data[0])
    const {email, name, password, currency, budget, oneTime, recurring} = currentData;
    const newUser = new User({email, name, password, currency, budget, oneTime, recurring})
    newUser.save();
    console.log('dummy database saved!');
  }
})