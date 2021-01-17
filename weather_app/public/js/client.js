console.log('client');

const form = document.querySelector('form');
const search = document.querySelector('#location_input');
const locationParagraph = document.querySelector('#msg-1');
const forecastParagraph = document.querySelector('#msg-2');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;

  locationParagraph.textContent = 'Fetching data';
  forecastParagraph.textContent = '';

  fetch('http://localhost:3000/weather?address=' + location)
      .then((response) => {
        response.json().then((data) => {
          if (data.error) {
            locationParagraph.textContent = data.error;
          } else {
            locationParagraph.textContent = data.location;
            forecastParagraph.textContent = data.forecast;
          }
        });
      });
});
