import { expect } from 'chai';

import sampleData from '../src/data/sampleData';

import {
  getUserData,
  compareStepsWithGoal,
  calculateDistanceTraveled,
  getMinutesActive,
  getDataByDate,
  getUserStepGoal,
  getAllTimeAverage,
} from '../src/model';

describe('activityData', () => {
  let average,
    userData,
    userData1,
    userData2,
    userData3,
    userActivityData1,
    userActivityData2,
    userActivityData3,
    activityDataByDate1,
    activityDataByDate2,
    activityDataByDate3,
    stepGoal;

  beforeEach('init data', () => {
    userData = getUserData('users', sampleData.users, 1);
    stepGoal = getUserStepGoal(userData);
    average = getAllTimeAverage('dailyStepGoal', sampleData.users);
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

  it("should return a user's step goal", () => {
    expect(stepGoal).to.equal(6000);
  });

  it('should return the average of all step goals', () => {
    expect(average).to.equal(6000);
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
