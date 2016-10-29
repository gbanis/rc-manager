import 'isomorphic-fetch';

const API_KEY = '7d5a10bbadb39ffefebac06cb7b15fe1';

const ENDPONT = 'http://api.openweathermap.org/data/2.5/forecast';

export const fetchForecast = (location) => {
  return fetch(`${ENDPONT}?q=${location}&mode=json&units=imperial&appid=${API_KEY}`)
    .then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    });
};
