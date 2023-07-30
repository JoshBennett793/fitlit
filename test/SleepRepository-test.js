import { expect } from 'chai';

import sampleData from '../src/data/sampleData';

import {
  getUserData,
  getAllTimeAverage,
  getDataByDate,
  getWeekly,
} from '../src/model';

describe('sleepData', () => {
  let sleep;

  beforeEach('init sleepData', () => {
    sleep = sampleData.sleepData;
  });

  it('should return a users average sleep per day', () => {
    const userData = getUserData('sleepData', sleep, 1);
    const sleeper = getAllTimeAverage('hoursSlept', userData);

    expect(sleeper).to.equal(9.6);
  });

  it('should return 0 if no user data is found', () => {
    const userData = getUserData('sleepData', sleep, 5);
    const sleeper = getAllTimeAverage('hoursSlept', userData);

    expect(sleeper).to.equal(0);
  });

  it('should return the average of all time sleep quality', () => {
    const userData = getAllTimeAverage('sleepQuality', sleep);

    expect(userData).to.equal(3.6);
  });

  it('should return how many hours a user slept for a specific day', () => {
    const userData = getUserData('sleepData', sleep, 2);
    const sleeps = getDataByDate('hoursSlept', userData, '2023/03/25');

    expect(sleeps).to.equal(8.4);
  });

  it('should return a users sleep quality for a specific day', () => {
    const userData = getUserData('sleepData', sleep, 2);
    const sleeps = getDataByDate('sleepQuality', userData, '2023/03/25');

    expect(sleeps).to.equal(3.5);
  });

  it('should return an object of how many hours a user slept each day over 7 days', () => {
    const userData = getUserData('sleepData', sleep, 3);
    const slept = getWeekly('hoursSlept', userData, '2023/03/31');

    expect(slept).to.be.an('object');
    expect(slept).to.deep.equal({
      '2023/03/25': 8.0,
      '2023/03/26': 8.1,
      '2023/03/27': 7.5,
      '2023/03/28': 7.5,
      '2023/03/29': 7.1,
      '2023/03/30': 7.5,
      '2023/03/31': 6.9,
    });
  });

  it('should have keys in order from least to most recent', () => {
    const userData = getUserData('sleepData', sleep, 3);
    const weeklySleep = getWeekly('hoursSlept', userData, '2023/03/30');

    const sleepDates = Object.keys(weeklySleep);
    expect(sleepDates).to.deep.equal([
      '2023/03/30',
      '2023/03/29',
      '2023/03/28',
      '2023/03/27',
      '2023/03/26',
      '2023/03/25',
      '2023/03/24',
    ]);
  });

  it('should return an empty object if no user data exists', () => {
    const userData = getUserData('sleepData', sleep, 5);
    const water = getWeekly('hoursSlept', userData, '2023/03/24');

    expect(water).to.deep.equal({});
  });
});
