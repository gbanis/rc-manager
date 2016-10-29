import {
  calculatePerfectData,
  perfectConditions,
  simplify,
  toHourly
} from 'lib/weatherUtils';

import { bostonWeather } from '../fixtures/openWeatherMap';

describe('weatherUtils', () => {
  describe('simplify', () => {
    let result;

    before(() => {
      result = simplify(bostonWeather);
    });

    it('returns correct location', () => {
      expect(result.location.lat).to.equal(42.358429);
      expect(result.location.lon).to.equal(-71.059769);
      expect(result.location.name).to.equal('Boston');
      expect(result.location.country).to.equal('US');
    });

    it('returns a correct forecast without rain', () => {
      const withoutRain = result.list[0];
      expect(withoutRain.timestamp).to.equal(1477278000);
      expect(withoutRain.temp).to.equal(53.37);
      expect(withoutRain.wind).to.equal(17.05);
      expect(withoutRain.rain).to.equal(0);
    });

    it('returns a correct forecast with rain', () => {
      const withRain = result.list[1];
      expect(withRain.timestamp).to.equal(1477288800);
      expect(withRain.temp).to.equal(53.53);
      expect(withRain.wind).to.equal(14.67);
      expect(withRain.rain).to.equal(0.0125);
    });
  });

  describe('toHourly', () => {
    let result;
    const oneHourSeconds = 60 * 60;

    before(() => {
      result = toHourly(simplify(bostonWeather));
    });

    it('returns a forecast list with hourly intervals', () => {
      result.list.reduce((a, b) => {
        expect(b.timestamp - a.timestamp).to.equal(oneHourSeconds);
        return b;
      });
    });

    xit('calculates rain intervals correclty', () => {
      // todo
    });
  });

  describe('calculatePerfectData', () => {
    it('calculates perfect conditions properly', () => {
      const generateSampleCondition = (item) => {
        return (item.min + item.max) / 2.0;
      };
      const forecast = {
        timestamp: 1477762547001,
        temp: generateSampleCondition(perfectConditions.temp),
        wind: generateSampleCondition(perfectConditions.wind),
        rain: generateSampleCondition(perfectConditions.rain)
      };

      const withPerfect = calculatePerfectData(forecast);

      expect(withPerfect.isPerfect).to.be.true;
      expect(withPerfect.isPerfectWind).to.be.true;
      expect(withPerfect.isPerfectTemp).to.be.true;
      expect(withPerfect.isPerfectRain).to.be.true;
    });

    it('calculates imperfect conditions properly', () => {
      const generateSampleCondition = (item) => {
        return item.max + 1;
      };
      const forecast = {
        timestamp: 1477762547001,
        temp: generateSampleCondition(perfectConditions.temp),
        wind: generateSampleCondition(perfectConditions.wind),
        rain: generateSampleCondition(perfectConditions.rain)
      };

      const withPerfect = calculatePerfectData(forecast);

      expect(withPerfect.isPerfect).to.be.false;
      expect(withPerfect.isPerfectWind).to.be.false;
      expect(withPerfect.isPerfectTemp).to.be.false;
      expect(withPerfect.isPerfectRain).to.be.false;
    });
  });
});
