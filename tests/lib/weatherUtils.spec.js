import {
  simplify
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
      expect(withoutRain.rain).to.be.undefined;
    });

    it('returns a correct forecast with rain', () => {
      const withRain = result.list[1];
      expect(withRain.timestamp).to.equal(1477288800);
      expect(withRain.temp).to.equal(53.53);
      expect(withRain.wind).to.equal(14.67);
      expect(withRain.rain).to.equal(0.0125);
    });
  });
});
