import { expect } from 'chai';

import sampleData from '../src/data/sampleData';

import {
  getUserData,
  getAllTimeAverage,
  getDataByDate,
  getWeekly,
} from '../src/model';

describe('hydrationData', () => {
  let hydrationData;

  beforeEach('init hydrationData', () => {
    hydrationData = sampleData.hydration;
  });

  it('should return a number of average all time water intake', () => {
    const userData = getUserData('hydrationData', hydrationData, 1);
    const water = getAllTimeAverage('numOunces', userData);

    expect(water).to.be.a('number');
    expect(water).to.equal(45);
  });

  it('should return 0 if no user data is found', () => {
    const userData = getUserData('hydrationData', hydrationData, 4);
    const water = getAllTimeAverage('numOunces', userData);

    expect(water).to.equal(0);
  });

  it('should return a number for the amount of ounces a user has consumed on a specific day', () => {
    const userData = getUserData('hydrationData', hydrationData, 1);
    const water = getDataByDate('numOunces', userData, '2023/03/26');

    expect(water).to.be.a('number');
    expect(water).to.equal(21);
  });

  it('should return a 0 if no user data is found for that date', () => {
    const userData = getUserData('hydrationData', hydrationData, 1);
    const water = getDataByDate('numOunces', userData, '2023/04/28');

    expect(water).to.equal(0);
  });

  it('should return a object with ounces of water for the last 7 days of data', () => {
    const userData = getUserData('hydrationData', hydrationData, 1);
    const water = getWeekly('numOunces', userData, '2023/03/30');

    expect(water).to.be.an('object');
    expect(water).to.deep.equal({
      '2023/03/30': 20,
      '2023/03/29': 96,
      '2023/03/28': 38,
      '2023/03/27': 22,
      '2023/03/26': 21,
      '2023/03/24': 50,
      '2023/03/23': 28,
    });
  });

  it('should have keys in order from least to most recent', () => {
    const userData = getUserData('hydrationData', hydrationData, 1);
    const water = getWeekly('numOunces', userData, '2023/03/30');
    const waterDates = Object.keys(water);
    expect(waterDates).to.deep.equal([
      '2023/03/23',
      '2023/03/24',
      '2023/03/26',
      '2023/03/27',
      '2023/03/28',
      '2023/03/29',
      '2023/03/30',
    ]);
  });

  it('should return an object holding all possible elements after the current date if there are less than 7', () => {
    const userData = getUserData('hydrationData', hydrationData, 2);
    const water = getWeekly('numOunces', userData, '2023/03/25');

    expect(water).to.deep.equal({ '2023/03/26': 88, '2023/03/24': 35 });
  });

  it('should return an empty object if no user data exists', () => {
    const userData = getUserData('hydrationData', hydrationData, 4);
    const water = getWeekly('numOunces', userData, '2023/03/30');

    expect(water).to.deep.equal({});
  });
});
