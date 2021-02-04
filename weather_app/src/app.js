const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');
const express = require('express');
const path = require('path');

const app = express();

const viewPath = path.join(__dirname, '../views');
app.set('view engine', 'hbs');
app.set('views', viewPath);

// log
console.log(__dirname);

// STATIC RESOURCES
app.use(express.static(path.join(__dirname, '../public')));


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/weather', async (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Address not given',
    });
  }
  try {
    const {longitude, latitude, place} = await geocode(req.query.address);
    const data = await forecast(longitude, latitude);
    res.send({
      location: place,
      forecast: data,
      address: req.query.address,
    });
  } catch (e) {
    console.log(e);
  }
});


app.listen(3000);
