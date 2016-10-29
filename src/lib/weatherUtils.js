export const perfectConditions = {
  wind: {
    min: 0,
    max: 5
  },
  temp: {
    min: 40,
    max: 90
  },
  rain: {
    min: 0,
    max: 0.5
  }
};

export const simplify = (data) => {
  const location = {
    lon: data.city.coord.lon,
    lat: data.city.coord.lat,
    name: data.city.name,
    country: data.city.country
  };

  const list = data.list.map((forecast) => {
    return {
      timestamp: forecast.dt,
      temp: forecast.main && forecast.main.temp,
      wind: forecast.wind && forecast.wind.speed,
      rain: forecast.rain && forecast.rain['3h']
    };
  });

  return {
    location,
    list
  };
};

export const processForecasts = (data) => {
  return data.list.map((forecast) => {
    const isPerfectRain = !forecast.rain['3h'] ||
      (forecast.rain['3h'] > perfectConditions.rain.min &&
        forecast.rain['3h'] < perfectConditions.rain.max);
    const isPerfectTemp = forecast.main.temp > perfectConditions.temp.min &&
      forecast.main.temp < perfectConditions.temp.max;
    const isPerfectWind = forecast.wind.speed > perfectConditions.wind.min &&
      forecast.wind.speed < perfectConditions.wind.max;

    return {
      timestamp: forecast.dt,
      isPerfectWind,
      isPerfectTemp,
      isPerfectRain
    };
  });
};
