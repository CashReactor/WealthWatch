const fs = require('fs');
const parse = require('csv-parse');
const { DigitalCurrency } = require('./models/currencies');
const path = require('path');

fs
  .createReadStream(path.join(__dirname, '/data/digital_currencies.csv'), 'utf-8')
  .pipe(parse({ delimiter: ',', rowDelimiter: '\n', from: 2 }))
  .on('data', (data) => {
    const code = data[0];
    const name = data[1];
    const digital = new DigitalCurrency({ code, name });
    digital.save((err) => {
      if (err) {
        console.log('err: ', err);
      }
    });
  })
  .on('end', () => {
    console.log('finished');
  });
