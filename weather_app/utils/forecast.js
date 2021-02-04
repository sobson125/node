/* eslint-disable max-len */
const axios = require('axios');
const forecast = async (longitude, latitude) => {
  const url = 'http://api.weatherstack.com/current?access_key=d38f133b7a0328dcef484928d48f081c&query='+encodeURIComponent(latitude) +',' + encodeURIComponent(longitude)+'&units=m';
  try {
    const response = await axios.get(url);
    const summary = `Temperatura: ${response.data.current.temperature}, odczuwalna: ${response.data.current.feelslike}`;
    return summary;
  } catch (e) {
    console.log(e);
  }
};

module.exports = forecast;
