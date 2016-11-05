export const perfectConditions = {
  wind: {
    min: 0.0,
    max: 5.1
  },
  temp: {
    min: 34.0,
    max: 90.0
  },
  rain: {
    min: 0.0,
    max: 0.2
  }
};

export const simplify = (rawApiData) => {
  const location = {
    lon: rawApiData.city.coord.lon,
    lat: rawApiData.city.coord.lat,
    name: rawApiData.city.name,
    country: rawApiData.city.country
  };

  const list = rawApiData.list.map((forecast) => {
    return {
      timestamp: forecast.dt,
      temp: forecast.main && forecast.main.temp,
      wind: forecast.wind && forecast.wind.speed || 0,
      rain: forecast.rain && forecast.rain['3h'] || 0
    };
  });

  return {
    location,
    list
  };
};

export const toHourly = (simplifiedData) => {
  let hourlyList = [];
  const list = simplifiedData.list;

  for (let i = 0, len = list.length; i < len - 1; ++i) {
    let second = {};
    let third = {};

    Object.keys(list[i]).map((key) => {
      second[key] = (list[i + 1][key] - list[i][key]) / 3.0 + list[i][key];
      third[key] = (list[i + 1][key] - list[i][key]) * 2 / 3.0 + list[i][key];
    });

    hourlyList.push(list[i]);
    hourlyList.push(second);
    hourlyList.push(third);
  }

  return Object.assign({}, simplifiedData, { list: hourlyList });
};

export const calculatePerfectData = (forecast) => {
  const isPerfectRain = !forecast.rain ||
    (forecast.rain >= perfectConditions.rain.min &&
      forecast.rain <= perfectConditions.rain.max);
  const isPerfectTemp = forecast.temp >= perfectConditions.temp.min &&
    forecast.temp <= perfectConditions.temp.max;
  const isPerfectWind = forecast.wind >= perfectConditions.wind.min &&
    forecast.wind <= perfectConditions.wind.max;

  return {
    isPerfect: isPerfectWind && isPerfectRain && isPerfectTemp,
    isPerfectWind,
    isPerfectTemp,
    isPerfectRain
  };
};

export const enrichWithPerfectData = (hourlyData) => {
  return Object.assign({}, hourlyData, {
    list: hourlyData.list.map((forecast) => {
      return Object.assign({}, forecast, calculatePerfectData(forecast));
    })
  });
};

export const compute = (rawApiData) => enrichWithPerfectData(toHourly(simplify(rawApiData)));
