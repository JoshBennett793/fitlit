import { WeeklyStepsVsGoal, stepProgressBar } from './charts';
import {
  getWeekly,
  getCurrentDate,
  getTodays,
  getAllTimeAverage,
} from './model';
const userInfo = document.querySelector('.data-box');
const userStepsEl = document.querySelector('.user-steps .steps');
const avgStepsEl = document.querySelector('.avg-steps .steps');
const waterIntake = document.querySelector('.water-intake');
const usersName = document.querySelector('h2');
const weeklyWaterIntake = document.querySelector('.weekly-water-box');
const glassBox = document.querySelector('.glass-box');
const weeklySleepBox = document.querySelector('.weekly-sleep-data-box');
const allTimeSleepQuality = document.querySelector(
  '.average-sleep-quality-box'
);
const allTimeSleepHours = document.querySelector('.average-hours-sleep-box');
const dailySleepBox = document.querySelector('.daily-sleep-hours-box');
const dailyQualitySleepBox = document.querySelector('.daily-sleep-quality-box');
const stepBox = document.getElementById('current-steps');
const weeklySleepQuality = document.querySelector('.weekly-sleep-quality-box');

export function displayUsersName(user) {
  const firstName = user.name.split(' ')[0];
  usersName.innerText = `Hello, ${firstName}!`;
}

export function showUserData(user) {
  const userInfo = {
    name: document.querySelector('.name'),
    address: document.querySelector('.address'),
    email: document.querySelector('.email'),
  };

  userInfo.name.innerText = `Name: ${user.name}`;
  userInfo.address.innerText = `Address: ${user.address}`;
  userInfo.email.innerText = `Email: ${user.email}`;
}

export function showUserStepsVsAvg(userSteps, avg) {
  userStepsEl.innerText = `Your Step Goal: ${userSteps}`;
  avgStepsEl.innerText = `Average Step Goal: ${avg}`;
}

export function showCurrentDayWaterIntake(currentIntake) {
  showWaterGlasses(currentIntake);
  waterIntake.innerText = `Today : ${currentIntake} ounces`;
}

function showWaterGlasses(ounces) {
  let amount = Math.floor(ounces / 10);

  if (amount > 9) {
    amount = 9;
  }

  let html = '';

  for (let i = 0; i < amount; i++) {
    html += `<img class="water" src="./images/glass-of-water.png"/>`;
  }

  glassBox.innerHTML = `${html}`;
}

export function showWeeklyWaterIntake(userHydrationData) {
  const weeklyWater = getWeekly(
    'numOunces',
    userHydrationData,
    getCurrentDate(userHydrationData)
  );
  const days = Object.keys(weeklyWater);
  days.forEach(day => {
    weeklyWaterIntake.innerHTML += `<article class="week-day" >
                                    <p class="date" >${day.slice(5)}</p>
                                    <p class="weekly-ounces">${
                                      weeklyWater[day]
                                    }</p>
                                    </article>`;
  });
}

export function showWeeklySleepData(sleep) {
  const weeklySleep = getWeekly('hoursSlept', sleep, getCurrentDate(sleep));
  const sleeps = Object.keys(weeklySleep);
  sleeps.forEach(day => {
    weeklySleepBox.innerHTML += `<article class="week-day" >
    <p class="date" >${day.slice(5)}</p>
    <p class="weekly-ounces">${weeklySleep[day]}</p>
    </article>`;
  });
}

export function displayWeeklyStepData(weekData, goal) {
  WeeklyStepsVsGoal(weekData, goal);
}
export function displayTodaysStepData(stepData, goal) {
  stepProgressBar(stepData, goal);
  stepBox.innerText = `${stepData} steps`;
}

export function showDailySleepData(sleep) {
  const dailySleep = getTodays('hoursSlept', sleep, getCurrentDate(sleep));
  dailySleepBox.innerText = `${dailySleep}`;
}

export function showDailySleepQuality(sleep) {
  const dailySleepQuality = getTodays(
    'sleepQuality',
    sleep,
    getCurrentDate(sleep)
  );
  dailyQualitySleepBox.innerText = `${dailySleepQuality}`;
}

export function sleepAverage(sleep) {
  const sleepHours = getAllTimeAverage('hoursSlept', sleep);
  const sleepQuality = getAllTimeAverage('sleepQuality', sleep);

  allTimeSleepHours.innerText = `${sleepHours}`;
  allTimeSleepQuality.innerText = `${sleepQuality}`;
}

export function weeklyQualitySleep(sleep) {
  const weeklyQuality = getWeekly('sleepQuality', sleep, getCurrentDate(sleep));
  const sleepQuality = Object.keys(weeklyQuality);
  sleepQuality.forEach(day => {
    weeklySleepQuality.innerHTML += `<article class="week-day" >
    <p class="date" >${day.slice(5)}</p>
    <p class="weekly-ounces">${weeklyQuality[day]}</p>
    </article>`;
  });
}
