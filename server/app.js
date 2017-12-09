const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.set('port', process.env.PORT || 1337);

const port = app.get('/');

app.listen(port, () => {
  console.log('Express is listening on port 1337');
});
