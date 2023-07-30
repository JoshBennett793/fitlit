import { expect } from 'chai';

import sampleData from '../src/data/sampleData';

import { getUserData, getRandomUser } from '../src/model';

describe('user data functions', () => {
  let userData, user;

  beforeEach('init data', () => {
    userData = getUserData('users', sampleData.users, 1);
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

  it('should return a random user object from the array', () => {
    expect(sampleData.users).to.deep.include(user);
  });
});
