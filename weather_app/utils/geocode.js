const request = require('request');

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic29ib2wxMiIsImEiOiJja2p4MjExMDMwZGprMnVud25pbXYzaWg5In0.yWvGQyigeJ2cCJfVvD2ghQ';
  request({url: url, json: true}, (error, response) => {
    if (error) {
      callback('Unable to connect to service', null);
    } else if (response.body.features.length===0) {
      callback('something went wrong', null);
    } else {
      const coordinates = {
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
        place: response.body.features[0].place_name,
      };
      callback(null, coordinates);
    }
  });
};

module.exports = geocode;
