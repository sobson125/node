const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

geocode('Katowice', (error, data) => {
  console.log(data.place);
});

forecast(50.25, 19.50, (error, data) => {
  console.log(data);
});
