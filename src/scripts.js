import './images/glass-of-water.png';
import './images/zzzz.png';
import './css/styles.css';
import {
  displayUsersName,
  showWeeklySleepData,
  showDailySleepData,
  showDailySleepQuality,
  showWeeklyWaterIntake,
  showUserData,
  showUserStepsVsAvg,
  showCurrentDayWaterIntake,
  displayWeeklyStepData,
  sleepAverage,
  displayTodaysStepData,
  weeklyQualitySleep,
  displayDistanceTraveled,
  displayTimeActive,
} from './domUpdates';
import {
  getRandomUser,
  getUserData,
  getTodays,
  calculateDistanceTraveled,
  getActivityDataByDate,
  getCurrentDate,
  getAllTimeAverage,
  getWeekly,
  getMinutesActive,
} from './model';
import { getApiData } from './apiCalls';

function initializeStore() {
  const store = {
    users: 'http://localhost:3001/api/v1/users',
    sleep: 'http://localhost:3001/api/v1/sleep',
    hydration: 'http://localhost:3001/api/v1/hydration',
    activity: '	http://localhost:3001/api/v1/activity',
  };

  return {
    getAPIKey(endpoint) {
      return store[endpoint];
    },

    getKey(key) {
      return store[key];
    },

    setKey(key, value) {
      store[key] = value;
    },
  };
}

let store;

window.onload = () => {
  store = initializeStore();
  initializeApp();
};

function initializeApp() {
  Promise.all([
    getApiData(store.getAPIKey('users'), 'users'),
    getApiData(store.getAPIKey('sleep'), 'sleepData'),
    getApiData(store.getAPIKey('hydration'), 'hydrationData'),
    getApiData(store.getAPIKey('activity'), 'activityData'),
  ])
    .then(values => {
      const [users, sleepData, hydrationData, activityData] = values;
      store.setKey('userData', users);
      store.setKey('sleepData', sleepData);
      store.setKey('hydrationData', hydrationData);
      store.setKey('activityData', activityData);
    })
    .then(processUserData);
}

function processUserData() {
  const userData = store.getKey('userData');
  store.setKey('user', getRandomUser(userData));
  const user = store.getKey('user');
  const userSteps = user.dailyStepGoal;
  const avg = getAllTimeAverage('dailyStepGoal', userData);
  const userHydrationData = getUserData(
    'hydrationData',
    store.getKey('hydrationData'),
    user.id
  );
  const userSleepData = getUserData(
    'sleepData',
    store.getKey('sleepData'),
    user.id
  );
  const userActivityData = getUserData(
    'activityData',
    store.getKey('activityData'),
    user.id
  );
  const userWeeklyActivityData = userActivityData.slice(-7);
  const mostRecentActivityData = userWeeklyActivityData.slice(-1)[0];
  const dailyStepData = getTodays(
    'numSteps',
    userActivityData,
    getCurrentDate(userActivityData)
  );
  showCurrentDayWaterIntake(
    getTodays('numOunces', userHydrationData, getCurrentDate(userHydrationData))
  );
  showUserData(store.getKey('user'));
  showUserStepsVsAvg(userSteps, avg);
  displayUsersName(store.getKey('user'));
  showWeeklyWaterIntake(userHydrationData);
  displayWeeklyStepData(userWeeklyActivityData, user.dailyStepGoal);
  displayTodaysStepData(dailyStepData, user.dailyStepGoal);
  showWeeklySleepData(userSleepData);
  sleepAverage(userSleepData);
  showDailySleepData(userSleepData);
  showDailySleepQuality(userSleepData);
  weeklyQualitySleep(userSleepData);
  displayDistanceTraveled(
    calculateDistanceTraveled(user, undefined, userActivityData),
  );
  displayTimeActive(getMinutesActive(mostRecentActivityData));
}
