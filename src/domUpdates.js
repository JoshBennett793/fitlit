import {
  WeeklyStepsVsGoal,
  stepProgressBar,
  weeklySleepQualityChart,
  weeklySleepHoursChart,
  weeklyWaterIntakeChart,
} from './charts';
import {
  getWeekly,
  getUserData,
  getCurrentDate,
  getDataByDate,
  getAllTimeAverage,
  calculateTotalTimeSlept,
} from './model';
import { store, getAllApiData } from './scripts';
import { setApiData } from './apiCalls';

const userInfo = document.querySelector('.data-box');
const usersName = document.querySelector('h2');
const userStepsEl = document.querySelector('.user-steps');
const avgStepsEl = document.querySelector('.avg-steps');
const distanceTraveledEl = document.querySelector('.distance-value');
const timeActiveEl = document.querySelector('.active-value');
const waterIntake = document.querySelector('.water-intake');
const weeklyWaterIntake = document.querySelector('.weekly-water-box');
const glassBox = document.querySelector('.glass-box');
const stepBox = document.getElementById('current-steps');
const weeklySleepBox = document.querySelector('.weekly-sleep-data-box');
const allTimeSleepQuality = document.querySelector(
  '.average-sleep-quality-box',
);
const allTimeSleepHours = document.querySelector('.average-hours-sleep-box');
const dailySleepBox = document.querySelector('.daily-sleep-hours-box');
const dailyQualitySleepBox = document.querySelector('.daily-sleep-quality-box');
const sleepModal = document.querySelector('.sleep-modal');

// User

export function displayUsersName(user) {
  const firstName = user.name.split(' ')[0];
  usersName.innerText = `Hello, ${firstName}!`;
}

export function displayUserData(user) {
  const userInfo = {
    name: document.querySelector('.name'),
    address: document.querySelector('.address'),
    email: document.querySelector('.email'),
  };

  userInfo.name.innerText = `Name: ${user.name}`;
  userInfo.address.innerText = `Address: ${user.address}`;
  userInfo.email.innerText = `Email: ${user.email}`;
}

// Steps

export function displayUserStepsVsAvg(userSteps, avg) {
  userStepsEl.innerText = `You: ${userSteps}`;
  avgStepsEl.innerText = `Avg: ${avg}`;
}

export function displayTodaysStepData(stepData, goal) {
  stepBox.innerText = `${stepData} Steps`;
  return stepProgressBar(stepData, goal);
}

export function displayWeeklyStepData(weekData, goal) {
  return WeeklyStepsVsGoal(weekData, goal);
}

// Activity

export function displayDistanceTraveled(distance) {
  distanceTraveledEl.innerText = `${distance} mi`;
}

export function displayTimeActive(time) {
  timeActiveEl.innerText = `${time} mins`;
}

// Sleep

export function sleepAverage(sleep) {
  const sleepHours = getAllTimeAverage('hoursSlept', sleep);
  const sleepQuality = getAllTimeAverage('sleepQuality', sleep);

  allTimeSleepHours.innerText = `${sleepHours}`;
  allTimeSleepQuality.innerText = `${sleepQuality}`;
}

export function displayDailySleepData(sleep) {
  const dailySleep = getDataByDate('hoursSlept', sleep, getCurrentDate(sleep));
  dailySleepBox.innerText = `${dailySleep}`;
}

export function displayWeeklySleepData(userWeeklySleepData) {
  return weeklySleepHoursChart(userWeeklySleepData);
}

export function displayDailySleepQuality(sleep) {
  const dailySleepQuality = getDataByDate(
    'sleepQuality',
    sleep,
    getCurrentDate(sleep),
  );

  dailyQualitySleepBox.innerText = '';
  dailyQualitySleepBox.innerText = `${dailySleepQuality}`;
}

export function displayWeeklySleepQuality(userWeeklySleepData) {
  return weeklySleepQualityChart(userWeeklySleepData);
}

// Hydration

export function displayCurrentDayWaterIntake(currentIntake) {
  waterIntake.innerText = `Today : ${currentIntake} ounces`;
}

export function displayWeeklyWaterIntake(userWeeklyHydrationData) {
  return weeklyWaterIntakeChart(userWeeklyHydrationData);
}

export function toggleAddSleepModal() {
  sleepModal.classList.toggle('visible');
}

export function storeSleepData() {
  const sleepModalForm = document.querySelector('form');

  const formData = new FormData(sleepModalForm);
  const values = [...formData.entries()];
  const formattedValues = values.reduce((acc, value) => {
    acc[value[0]] = value[1];
    return acc;
  }, {});

  const totalTimeSlept = calculateTotalTimeSlept(
    formattedValues['begin-time'],
    formattedValues['end-time'],
  );

  const user = store.getKey('user');
  const sleepData = getUserData(
    'sleepData',
    store.getKey('sleepData'),
    user.id,
  );
  const nextDay = new Date(getCurrentDate(sleepData));
  nextDay.setDate(nextDay.getDate() + 1);
  const year = nextDay.toLocaleString('default', { year: 'numeric' });
  const month = nextDay.toLocaleString('default', { month: '2-digit' });
  const day = nextDay.toLocaleString('default', { day: '2-digit' });
  const date = `${year}/${month}/${day}`;

  setApiData(
    store.getAPIKey('sleep'),
    user.id,
    date,
    parseFloat(totalTimeSlept),
    Number(formattedValues['sleep-quality']),
  )
    .then(() => {
      store.getKey('todaysStepDataChart').destroy();
      store.getKey('weeklyStepDataChart').destroy();
      store.getKey('weeklySleepDataChart').destroy();
      store.getKey('weeklySleepQualityChart').destroy();
      store.getKey('weeklyHydrationDataChart').destroy();
      getAllApiData(store.getKey('user'));
    })
    .catch(err => console.log(err));
}
