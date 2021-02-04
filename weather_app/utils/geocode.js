const axios = require('axios');

const geocode = async (address) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic29ib2wxMiIsImEiOiJja2p4MjExMDMwZGprMnVud25pbXYzaWg5In0.yWvGQyigeJ2cCJfVvD2ghQ';
  try {
    const response = await axios.get(url);
    console.log(response.data);
    return {
      longitude: response.data.features[0].center[0],
      latitude: response.data.features[0].center[1],
      place: response.data.features[0].place_name,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = geocode;
