import moment from 'moment';

// based on moment().day()
// Sunday is 0 ... Saturday is 6.

export const defaultPreferredTimes = {
  0: [
    {
      startHour: 8,
      endHour: 20
    }
  ],
  1: [
    {
      startHour: 8,
      endHour: 12
    },
    {
      startHour: 17,
      endHour: 20
    }
  ],
  2: [
    {
      startHour: 8,
      endHour: 12
    },
    {
      startHour: 17,
      endHour: 20
    }
  ],
  3: [
    {
      startHour: 8,
      endHour: 12
    },
    {
      startHour: 17,
      endHour: 20
    }
  ],
  4: [
    {
      startHour: 8,
      endHour: 12
    },
    {
      startHour: 17,
      endHour: 20
    }
  ],
  5: [
    {
      startHour: 8,
      endHour: 12
    },
    {
      startHour: 17,
      endHour: 20
    }
  ],
  6: [
    {
      startHour: 8,
      endHour: 20
    }
  ]
};

export const isPreferred = (timestamp, preferredTimes = defaultPreferredTimes) => {
  const time = moment.unix(timestamp);
  const day = time.day();
  const hour = time.hour();

  return preferredTimes[day].some((interval) => {
    const { startHour, endHour } = interval;
    return hour >= startHour && hour <= endHour;
  });
};
