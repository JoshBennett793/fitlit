import Chart from 'chart.js/auto';
import { compareStepsWithGoal } from './model';

export function WeeklyStepsVsGoal(weekData, goal) {
  const dates = weekData.map(row => row.date.slice(5))
  new Chart(document.getElementById('weekly-steps-bar-chart'), {
    type: 'bar',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'Actual Steps',
          data: weekData.map(row => row.numSteps),
          backgroundColor: ['rgb(255,0,152)']
        },
        {
          label: 'Step Goal',
          data: weekData.map(row => goal),
          backgroundColor: ['rgb(181,219,253)']
        },
      ],
    },
  });
}

export function weeklySleepQualityChart(weekData) {
  const dates = weekData.map(row => row.date.slice(5)).slice(-7)
  new Chart(document.getElementById('weekly-sleep-quality-bar-chart'), {
    type: 'bar',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'Sleep Quality',
          data: weekData.map(row => row.sleepQuality).slice(-7),
          backgroundColor: ['rgb(255,0,152)']
        }
      ]
    }
  })
}

export function weeklySleepHoursChart(weekData) {
  const dates = weekData.map(row => row.date.slice(5)).slice(-7)
  new Chart(document.getElementById('weekly-sleep-hours-bar-chart'), {
    type: 'bar',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'Hours Slept',
          data: weekData.map(row => row.hoursSlept).slice(-7),
          backgroundColor: ['rgb(255,0,152)']
        }
      ]
    }
  })
}

export function weeklyWaterIntakeChart(weekData) {
  const dates = weekData.map(row => row.date.slice(5)).slice(-7)
  new Chart(document.getElementById('weekly-water-intake-bar-chart'), {
    type: 'bar',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'Weekly Water',
          data: weekData.map(row => row.numOunces).slice(-7),
          backgroundColor: ['rgb(255,0,152)']
        }
      ]
    }
  })
}

  export function stepProgressBar(stepData, goal) {
  let goalRemainder = 0;

  if (compareStepsWithGoal(stepData, goal)) {
    goalRemainder = goal - stepData;
  }

  new Chart(document.getElementById('steps-progress-bar'), {
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
