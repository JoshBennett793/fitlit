import { WeeklyStepsVsGoal, stepProgressBar, weeklySleepQualityChart} from './charts';
import {
  getWeekly,
  getCurrentDate,
  getDataByDate,
  getAllTimeAverage,
} from './model';
const userInfo = document.querySelector('.data-box');
const userStepsEl = document.querySelector('.user-steps');
const avgStepsEl = document.querySelector('.avg-steps');
const distanceTraveledEl = document.querySelector('.distance-value');
const timeActiveEl = document.querySelector('.active-value');
const waterIntake = document.querySelector('.water-intake');
const usersName = document.querySelector('h2');
const weeklyWaterIntake = document.querySelector('.weekly-water-box');
const glassBox = document.querySelector('.glass-box');
const weeklySleepBox = document.querySelector('.weekly-sleep-data-box');
const allTimeSleepQuality = document.querySelector(
  '.average-sleep-quality-box',
);
const allTimeSleepHours = document.querySelector('.average-hours-sleep-box');
const dailySleepBox = document.querySelector('.daily-sleep-hours-box');
const dailyQualitySleepBox = document.querySelector('.daily-sleep-quality-box');
const stepBox = document.getElementById('current-steps');
const weeklySleepQuality = document.querySelector('.weekly-sleep-quality-box');

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
  stepProgressBar(stepData, goal);
  stepBox.innerText = `${stepData} Steps`;
}

export function displayWeeklyStepData(weekData, goal) {
  WeeklyStepsVsGoal(weekData, goal);
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
  sleeps.forEach(day => {
    weeklySleepBox.innerHTML += `<article class="week-day" >
    <p class="date" >${day.slice(5)}</p>
    <p class="weekly-ounces">${weeklySleep[day]}h</p>
    </article>`;
  });
}

export function displayDailySleepQuality(sleep) {
  const dailySleepQuality = getDataByDate(
    'sleepQuality',
     sleep,
    getCurrentDate(sleep),
  );
  dailyQualitySleepBox.innerText = `${dailySleepQuality}`;
}

export function displayWeeklySleepQuality(sleep) {
  weeklySleepQualityChart(sleep)
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
  days.forEach(day => {
    weeklyWaterIntake.innerHTML += `<article class="week-day" >
                                    <p class="date" >${day.slice(5)}</p>
                                    <p class="weekly-ounces">${
                                      weeklyWater[day]
                                    }oz</p>
                                    </article>`;
  });
}
