import './images/glass-of-water.png';
import './images/pink-moon.png';
import './images/distance.svg';
import './images/time.svg';
import './css/styles.css';

import {
  // User
  displayUsersName,
  displayUserData,

  // Steps
  displayUserStepsVsAvg,
  displayTodaysStepData,
  displayWeeklyStepData,

  // Activity
  displayDistanceTraveled,
  displayTimeActive,

  // Sleep
  sleepAverage,
  displayDailySleepData,
  displayDailySleepQuality,
  displayWeeklySleepData,
  displayWeeklySleepQuality,
  toggleAddSleepModal,

  // Hydration
  displayCurrentDayWaterIntake,
  displayWeeklyWaterIntake,
} from './domUpdates';

import {
  // User
  getRandomUser,
  getUserData,
  getDataByDate,
  getAllTimeAverage,
  getWeekly,
  // Activity
  calculateDistanceTraveled,
  getMinutesActive,
  // Utility
  getCurrentDate,

} from './model';
import { getApiData, setApiData } from './apiCalls';

// Query Selectors
const addSleepDataButton = document.querySelector('.add-btn');
const exitModalButton = document.querySelector('.exit-modal');

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
      store.setKey('user', getRandomUser(users));
      store.setKey('sleepData', sleepData);
      store.setKey('hydrationData', hydrationData);
      store.setKey('activityData', activityData);
    })
    .then(processUserData);
}

function processUserData() {
  // User Data
  const user = store.getKey('user');
  const userData = store.getKey('userData');
  const avg = getAllTimeAverage('dailyStepGoal', userData);

  // Activity Data
  const userActivityData = getUserData(
    'activityData',
    store.getKey('activityData'),
    user.id,
  );
  const userWeeklyActivityData = getWeekly('numSteps', userActivityData, getCurrentDate(userActivityData));
  const mostRecentActivityData = getDataByDate('minutesActive', userActivityData, getCurrentDate(userActivityData));

  // Step Data
  const userSteps = user.dailyStepGoal;
  const dailyStepData = getDataByDate(
    'numSteps',
    userActivityData,
    getCurrentDate(userActivityData),
  );

  // Sleep Data
  const userSleepData = getUserData(
    'sleepData',
    store.getKey('sleepData'),
    user.id,
  );
  const userWeeklySleepData = getWeekly('hoursSlept', userSleepData, getCurrentDate
  (userSleepData));
  const weeklySleepQualityData = getWeekly('sleepQuality', userSleepData, getCurrentDate(userSleepData))


  // Hydration Data
  const userHydrationData = getUserData(
    'hydrationData',
    store.getKey('hydrationData'),
    user.id,
  );
  const userWeeklyHydrationData = userHydrationData.slice(-7)

  // Display User Data
  displayUserData(store.getKey('user'));
  displayUsersName(store.getKey('user'));

  // Display Step Data
  displayUserStepsVsAvg(userSteps, avg);
  displayTodaysStepData(dailyStepData, user.dailyStepGoal);
  displayWeeklyStepData(userWeeklyActivityData, user.dailyStepGoal);

  // Display Sleep Data
  sleepAverage(userSleepData);
  displayDailySleepData(userSleepData);
  displayWeeklySleepData(userWeeklySleepData);
  displayDailySleepQuality(userSleepData);
  console.log(weeklySleepQualityData)
  displayWeeklySleepQuality(weeklySleepQualityData);
  

  // Display Hydration Data
  displayCurrentDayWaterIntake(
    getDataByDate(
      'numOunces',
      userHydrationData,
      getCurrentDate(userHydrationData),
    ),
  );
  displayWeeklyWaterIntake(userWeeklyHydrationData);

  // Display Activity Data
  displayDistanceTraveled(
    calculateDistanceTraveled(user, undefined, userActivityData),
  );
  displayTimeActive(mostRecentActivityData);
}

// Event Listeners

addSleepDataButton.onclick = toggleAddSleepModal;
exitModalButton.onclick = toggleAddSleepModal;
