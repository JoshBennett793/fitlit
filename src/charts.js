import Chart from 'chart.js/auto';
import { compareStepsWithGoal } from './model';

const stepsDescription = document.querySelector('.steps-description');
const waterDescription = document.querySelector('.water-description');
const weeklySleepDescription = document.querySelector('.weekly-sleep-chart');
const sleepQualityDescription = document.querySelector('.sleep-quality-chart');


export function WeeklyStepsVsGoal(weekData, goal) {
  const dates = Object.keys(weekData);
  const values = dates.map(date => weekData[date]);

  const displayInfo = dates.reduce((acc, date, index) => {
    acc += ` ${values[index]} steps on ${date} `;
    return acc;
  }, '');

  stepsDescription.innerText = displayInfo;

  return new Chart(document.getElementById('weekly-steps-bar-chart'), {
    type: 'bar',
    data: {
      labels: dates.map(date => date.slice(5)),
      datasets: [
        {
          label: 'Actual Steps',
          data: dates.map(date => weekData[date]),
          backgroundColor: ['rgb(255,0,152)'],
        },
        {
          label: 'Step Goal',
          data: dates.map(row => goal),
          backgroundColor: ['rgb(181,219,253)'],
        },
      ],
    },
  });
}

export function weeklySleepQualityChart(weekData) {
  const dates = Object.keys(weekData);
  const values = dates.map(date => weekData[date]);

  const displayInfo = dates.reduce((acc, date, index) => {
    acc += ` ${values[index]} sleep quality on ${date} `;
    return acc;
  }, '');

  sleepQualityDescription.innerText = displayInfo;

  return new Chart(document.getElementById('weekly-sleep-quality-bar-chart'), {
    type: 'bar',
    data: {
      labels: dates.map(date => date.slice(5)),
      datasets: [
        {
          label: 'Sleep Quality',
          data: dates.map(date => weekData[date]),
          backgroundColor: ['rgb(255,0,152)'],
        },
      ],
    },
  });
}

export function weeklySleepHoursChart(weekData) {
  const dates = Object.keys(weekData);
  const values = dates.map(date => weekData[date]);

  const displayInfo = dates.reduce((acc, date, index) => {
    acc += ` ${values[index]} hours slept on ${date} `;
    return acc;
  }, '');

  weeklySleepDescription.innerText = displayInfo;

  return new Chart(document.getElementById('weekly-sleep-hours-bar-chart'), {
    type: 'bar',
    data: {
      labels: dates.map(date => date.slice(5)),
      datasets: [
        {
          label: 'Hours Slept',
          data: dates.map(date => weekData[date]),
          backgroundColor: ['rgb(255,0,152)'],
        },
      ],
    },
  });
}

export function weeklyWaterIntakeChart(weekData) {
  const dates = weekData.map(row => row.date.slice(5)).slice(-7);

  const keys = Object.keys(weekData);
  const values = keys.map(date => weekData[date].numOunces);


  const displayInfo = dates.reduce((acc, date, index) => {
    acc += ` ${values[index]} oz on ${date} `;
    return acc;
  }, '');

  waterDescription.innerText = displayInfo;

  return new Chart(document.getElementById('weekly-water-intake-bar-chart'), {
    type: 'bar',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'Weekly Water',
          data: weekData.map(row => row.numOunces).slice(-7),
          backgroundColor: ['rgb(255,0,152)'],
        },
      ],
    },
  });
}

export function stepProgressBar(stepData, goal) {
  let goalRemainder = 0;

  if (compareStepsWithGoal(stepData, goal)) {
    goalRemainder = goal - stepData;
  }

  return new Chart(document.getElementById('steps-progress-bar'), {
    type: 'doughnut',
    data: {
      labels: ['Steps', 'Remaining'],
      datasets: [
        {
          data: [stepData, goalRemainder],
          backgroundColor: ['rgb(255,0,152)', 'rgb(181,219,253)'],
          color: 'rgb(255,0,152)',
          cutout: '70%',
          hoverOffset: 4,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: '#e9c4e0',
          },
        },
      },
    },
  });
}
