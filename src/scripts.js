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
const saveFormButton = document.querySelector('.save-btn');
const form = document.querySelector('form');

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
  const userWeeklyActivityData = userActivityData.slice(-7);
  const mostRecentActivityData = userWeeklyActivityData.slice(-1)[0];

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
  // setApiData('http://localhost:3001/api/v1/sleep');


  // Hydration Data
  const userHydrationData = getUserData(
    'hydrationData',
    store.getKey('hydrationData'),
    user.id,
  );

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
  displayWeeklySleepData(userSleepData);
  displayDailySleepQuality(userSleepData);
  displayWeeklySleepQuality(userSleepData);

  // Display Hydration Data
  displayCurrentDayWaterIntake(
    getDataByDate(
      'numOunces',
      userHydrationData,
      getCurrentDate(userHydrationData),
    ),
  );
  displayWeeklyWaterIntake(userHydrationData);

  // Display Activity Data
  displayDistanceTraveled(
    calculateDistanceTraveled(user, undefined, userActivityData),
  );
  displayTimeActive(getMinutesActive(mostRecentActivityData));
}

// Event Listeners

addSleepDataButton.addEventListener('click', () => {
  toggleAddSleepModal();
})
exitModalButton.addEventListener('click', () => {
  toggleAddSleepModal();
  form.reset();
})

form.addEventListener('keyup', changeSave)
form.addEventListener('click', changeSave)

function changeSave() {
  if (form.checkValidity()) {
    saveFormButton.classList.add('neon')
  } else {
    saveFormButton.classList.remove('neon')
  }
  
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(form.checkValidity())
  form.checkValidity().reportValidity();

  toggleAddSleepModal();
  form.reset();
})