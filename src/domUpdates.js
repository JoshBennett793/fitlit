import L from 'leaflet';
import {
  WeeklyStepsVsGoal,
  stepProgressBar,
  weeklySleepQualityChart,
  weeklySleepHoursChart,
  weeklyWaterIntakeChart,
} from './charts';
import { getCurrentDate, getDataByDate, getAllTimeAverage } from './model';

const usersName = document.querySelector('h2');
const userStepsEl = document.querySelector('.user-steps');
const avgStepsEl = document.querySelector('.avg-steps');
const distanceTraveledEl = document.querySelector('.distance-value');
const timeActiveEl = document.querySelector('.active-value');
const waterIntake = document.querySelector('.water-intake');
const stepBox = document.getElementById('current-steps');
const allTimeSleepQuality = document.querySelector(
  '.average-sleep-quality-box',
);
const allTimeSleepHours = document.querySelector('.average-hours-sleep-box');
const dailySleepBox = document.querySelector('.daily-sleep-hours-box');
const dailyQualitySleepBox = document.querySelector('.daily-sleep-quality-box');
const sleepModal = document.querySelector('.sleep-modal');
const errorMsg = document.querySelector('.modal-error-message');
const milesRunBox = document.querySelector('.distance-run');

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
  userStepsEl.innerText = `${userSteps} Steps`;
  avgStepsEl.innerText = `${avg} Steps`;
}

export function displayTodaysStepData(stepData, goal) {
  stepBox.innerText = `${stepData} Steps`;
  return stepProgressBar(stepData, goal);
}

export function displayWeeklyStepData(weekData, goal) {
  return WeeklyStepsVsGoal(weekData, goal);
}

export function displayRunOnMap(latlngs) {
  const map = L.map('map');

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const polyline = L.polyline(latlngs, { color: 'red' }).addTo(map);

  map.fitBounds(polyline.getBounds());
}

// Activity

export function displayDistanceTraveled(distance) {
  distanceTraveledEl.innerText = `${distance}`;
}

export function displayTimeActive(time) {
  timeActiveEl.innerText = `${time}`;
}

export function displayMilesRun(milesRun) {
  milesRunBox.innerText = milesRun.textContent.slice(0, 4);
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

export function toggleAddSleepModal() {
  sleepModal.classList.toggle('visible');
}

// Hydration

export function displayCurrentDayWaterIntake(currentIntake) {
  waterIntake.innerText = `${currentIntake}`;
}

export function displayWeeklyWaterIntake(userWeeklyHydrationData) {
  return weeklyWaterIntakeChart(userWeeklyHydrationData);
}

// Errors

export function displayError(error) {
  errorMsg.innerText = error;
}
