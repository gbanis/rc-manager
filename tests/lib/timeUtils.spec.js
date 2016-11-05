import {
  isPreferred
} from 'lib/timeUtils';

const TIMESTAMPS = {
  FRIDAY_5AM_EST: 1478250000,
  FRIDAY_9AM_EST: 1478264400,
  FRIDAY_6PM_EST: 1478296800,
  SATURDAY_11AM_EST: 1478358000
};

describe('timeUtils', () => {
  describe('isPreferred', () => {
    it('returns true for weekday within default morning limits', () => {
      expect(isPreferred(TIMESTAMPS.FRIDAY_9AM_EST)).to.be.true;
    });

    it('returns true for weekday within default evening limits', () => {
      expect(isPreferred(TIMESTAMPS.FRIDAY_6PM_EST)).to.be.true;
    });

    it('returns false for weekend within default limits', () => {
      expect(isPreferred(TIMESTAMPS.FRIDAY_5AM_EST)).to.be.false;
    });

    it('returns true for weekday outside default limits', () => {
      expect(isPreferred(TIMESTAMPS.SATURDAY_11AM_EST)).to.be.true;
    });
  });
});
