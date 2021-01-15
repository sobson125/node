const request = require('request');
const url = 'http://api.weatherstack.com/current?access_key=d38f133b7a0328dcef484928d48f081c&query=50.25,19.50';

const params = {
  url: url,
  json: true,
};
// request(params, (error, response) => {
//   const data = response.body;
//   if (error) {
//     console.log('Unable to connect to service');
//   } else if (response.body.error) {
//     console.log('Error: '+response.body.error.type);
//   } else {
//     // eslint-disable-next-line max-len
//     console.log(`Temperatura: ${data.current.temperature}, odczuwalna: ${data.current.feelslike}`);
//   }
// });

const urlMapBox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/xddaserwsa.json?access_token=pk.eyJ1Ijoic29ib2wxMiIsImEiOiJja2p4MjExMDMwZGprMnVud25pbXYzaWg5In0.yWvGQyigeJ2cCJfVvD2ghQ';

request({
  url: urlMapBox,
  json: true,
}, (error, response) => {
  const data = response.body;
  if (error) {
    console.log('Unable to connect to service');
  } else if (data.features.length===0) {
    console.log('something went wrong');
  } else {
    console.log(`Koordynaty:
      ${data.features[0].center[1]}
      ${data.features[0].center[0]}
      ${data.features[0].place_name}`);
  }
});
