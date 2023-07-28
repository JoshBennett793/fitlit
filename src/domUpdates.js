import { WeeklyStepsVsGoal, stepProgressBar } from './charts';
import {
  getWeekly,
  getCurrentDate,
  getDataByDate,
  getAllTimeAverage,
} from './model';
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
const weeklySleepQuality = document.querySelector('.weekly-sleep-quality-box');
const sleepModal = document.querySelector('.add-sleep-data-modal');

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

export function displayWeeklySleepData(sleep) {
  const weeklySleep = getWeekly('hoursSlept', sleep, getCurrentDate(sleep));
  const sleeps = Object.keys(weeklySleep);
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

export function displayWeeklySleepQuality(sleep) {
  const weeklyQuality = getWeekly('sleepQuality', sleep, getCurrentDate(sleep));
  const sleepQuality = Object.keys(weeklyQuality);
  
  const dailySleepQuality = getDataByDate(
    'sleepQuality',
    sleep,
    getCurrentDate(sleep),
  );
  dailyQualitySleepBox.innerText = `${dailySleepQuality}`;
}

// Hydration

export function displayCurrentDayWaterIntake(currentIntake) {
  waterIntake.innerText = `Today : ${currentIntake} ounces`;
}

export function displayWeeklyWaterIntake(userHydrationData) {
  const weeklyWater = getWeekly(
    'numOunces',
    userHydrationData,
    getCurrentDate(userHydrationData),
  );
  const days = Object.keys(weeklyWater);
}

export function toggleAddSleepModal() {
  sleepModal.classList.toggle('visible');
}