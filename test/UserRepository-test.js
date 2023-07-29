import { expect } from 'chai';

import sampleData from '../src/data/sampleData';

import {
  getUserData,
  getRandomUser,
  getUserStepGoal,
  getAllTimeAverage,
  compareStepsWithGoal,
  calculateDistanceTraveled,
  getMinutesActive,
  getDataByDate,
  getWeekly,
} from '../src/model';

describe('user data functions', () => {
  let userData, average, user, stepGoal;

  beforeEach('init data', () => {
    userData = getUserData('users', sampleData.users, 1);
    stepGoal = getUserStepGoal(userData);
    average = getAllTimeAverage('dailyStepGoal', sampleData.users);
    user = getRandomUser(sampleData.users);
  });

  it('should return an object of user data', () => {
    expect(userData).to.deep.equal({
      id: 1,
      name: 'Trystan Gorczany',
      address: '9484 Lucas Flat, West Kittymouth WA 67504',
      email: 'Taurean_Pollich31@gmail.com',
      strideLength: 4,
      dailyStepGoal: 6000,
      friends: [5, 43, 46, 11],
    });
  });

  it("should return a user's step goal", () => {
    expect(stepGoal).to.equal(6000);
  });

  it('should return the average of all step goals', () => {
    expect(average).to.equal(6000);
  });

  it('should return a random user object from the array', () => {
    expect(sampleData.users).to.deep.include(user);
  });
});

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
      '2023/03/30',
      '2023/03/29',
      '2023/03/28',
      '2023/03/27',
      '2023/03/26',
      '2023/03/24',
      '2023/03/23',
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
      '2023/03/31': 6.9
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

  it('should return how many hours a user slept each day over the course of a given week', () => {
    const userData = getUserData('sleepData', sleep, 4);
    const sleeps = getWeekly('hoursSlept', userData, '2023/03/31');

    expect(sleeps).to.deep.equal({
      '2023/03/25': 6.3,
      '2023/03/26': 5.4,
      '2023/03/27': 7.1,
      '2023/03/28': 6,
      '2023/03/29': 5.6,
      '2023/03/30': 6.2,
      '2023/03/31': 8.3
    });
  });
});

describe('activityData', () => {
  let userData1,
    userData2,
    userData3,
    userActivityData1,
    userActivityData2,
    userActivityData3,
    activityDataByDate1,
    activityDataByDate2,
    activityDataByDate3;

  beforeEach('init data', () => {
    userData1 = getUserData('users', sampleData.users, 1);
    userActivityData1 = getUserData('activityData', sampleData.activity, 1);
    activityDataByDate1 = getDataByDate(
      'activityData',
      userActivityData1,
      '2023/03/25',
    );

    userData2 = getUserData('users', sampleData.users, 2);
    userActivityData2 = getUserData('activityData', sampleData.activity, 2);
    activityDataByDate2 = getDataByDate(
      'activityData',
      userActivityData2,
      '2023/03/25',
    );

    userData3 = getUserData('users', sampleData.users, 3);
    userActivityData3 = getUserData('activityData', sampleData.activity, 3);
    activityDataByDate3 = getDataByDate(
      'activityData',
      userActivityData3,
      '2023/03/25',
    );
  });

  it("should return a user's activity data by date", () => {
    expect(activityDataByDate1).to.deep.equal({
      userID: 1,
      date: '2023/03/25',
      numSteps: 14264,
      minutesActive: 111,
      flightsOfStairs: 1,
    });
  });

  it('should calculate distance traveled', () => {
    const distanceTraveled = calculateDistanceTraveled(
      userData1,
      '2023/03/25',
      sampleData.activity,
    );
    expect(distanceTraveled).to.equal(10.81);
  });

  it('should return the minutes a user was active on a specific date', () => {
    const minutes = getMinutesActive(activityDataByDate1);

    expect(minutes).to.equal(111);
  });

  it('should return a boolean true if the user has just met their goal', () => {
    const hasReachedGoal = compareStepsWithGoal(userData2, activityDataByDate2);

    expect(hasReachedGoal).to.equal(true);
  });

  it('should return a boolean true if the user has passed their goal', () => {
    const hasReachedGoal = compareStepsWithGoal(userData2, activityDataByDate2);

    expect(hasReachedGoal).to.equal(true);
  });

  it('should return a boolean false if the user has not passed their goal', () => {
    const hasReachedGoal = compareStepsWithGoal(
      userData3,
      activityDataByDate3.numSteps,
    );

    expect(hasReachedGoal).to.equal(false);
  });
});
