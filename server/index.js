//Import your routes here
// ***********************


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.set('port', process.env.PORT || 1337);
const port = app.get('port');

app.use(express.static(__dirname + '/../client/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use Routes here.....

app.listen(port, () => {
  console.log('Express is listening on port 1337');
});
