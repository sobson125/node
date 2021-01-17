const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');
const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, '../public')));
console.log(__dirname);
app.set('view engine', 'hbs');


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Address not given',
    });
  }

  geocode(req.query.address, (error, {longitude, latitude, place} = {}) => {
    if (error) {
      return res.send({error});
    }

    forecast(longitude, latitude, (error, data) => {
      if (error) {
        return res.send({error});
      }

      res.send({
        location: place,
        forecast: data,
        address: req.query.address,
      });
    });
  });
});


app.listen(3000);
