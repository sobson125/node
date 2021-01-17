const request = require('request');

const forecast = (longitude, latitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=d38f133b7a0328dcef484928d48f081c&query='+encodeURIComponent(latitude) +',' + encodeURIComponent(longitude)+'&units=m';
  request({url: url, json: true}, (error, response) => {
    if (error) {
      callback('Service not available', null);
    } else if (response.body.error) {
      callback(response.body.error.type, null);
    } else {
      const summary = `Temperatura: ${response.body.current.temperature}, odczuwalna: ${response.body.current.feelslike}`;
      callback(null, summary);
    }
  });
};

module.exports = forecast;
