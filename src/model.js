// Utility Functions

function getRandomID(array) {
  return Math.floor(Math.random() * 5) + 1;
}

export function getCurrentDate(userData) {
  return userData[userData.length - 1].date;
}

// User Data

export function getUserData(dataType, dataset, id) {
  if (dataType === 'users') {
    return dataset.find(data => data.id === id);
  } else {
    return dataset.filter(data => data.userID === id);
  }
}

export function getRandomUser(users) {
  return getUserData('users', users, getRandomID(users));
}

export function getAllTimeAverage(key, userData) {
  if (!userData.length) {
    return 0;
  }

  const avg =
    userData.reduce((sum, date) => sum + date[key], 0) / userData.length;

  if (key === 'numOunces' || key === 'dailyStepGoal') {
    return Math.round(avg);
  } else {
    return parseFloat(avg.toFixed(1));
  }
}

export function getDataByDate(key, userData, date) {
  userData = userData.find(data => data.date === date);

  if (!userData) {
    return 0;
  }

  if (key === 'activityData') {
    return userData;
  }

  return userData[key];
}

export function getWeekly(key, userData, date) {
  userData.sort((a, b) => new Date(a.date) - new Date(b.date));

  const indexOfDate = userData.findIndex(entry => entry.date === date);

  let weeklyData;
  if (userData.length <= 7) {
    weeklyData = userData.slice(0);
  } else {
    weeklyData = userData.slice(indexOfDate - 6, indexOfDate + 1);
  }

  return weeklyData.reduce((week, day) => {
    week[day.date] = day[key];
    return week;
  }, {});
}

// Step Data

export function getUserStepGoal(user) {
  return user.dailyStepGoal;
}

export function compareStepsWithGoal(stepData, goal) {
  if (stepData <= goal) {
    return true;
  }

  return false;
}

export function formatRunData(runData) {
  const latlngs = [...runData.querySelectorAll('rtept')];
  return latlngs.reduce((acc, curr) => {
    acc.push([curr.getAttribute('lat'), curr.getAttribute('lon')]);
    return acc;
  }, []);
}

export function getMilesRun(runData) {
  return runData.querySelector('name');
}

// Activity Data

export function getMinutesActive(activityData) {
  return activityData.minutesActive;
}

// Accepts a single user's data as userData param
// Accepts all activity data
export function calculateDistanceTraveled(
  userData,
  date = '2023/07/01',
  activityData,
) {
  // 1 mile === 5280 feet
  const mile = 5280;
  activityData = getDataByDate('activityData', activityData, date);
  const distance = (userData.strideLength * activityData.numSteps) / mile;
  return parseFloat(distance.toFixed(2));
}

// Sleep Data

export function calculateTotalTimeSlept(...times) {
  const [start, end] = times;
  const [hour1, min1] = start.split(':');
  const [hour2, min2] = end.split(':');

  let diffHour = parseInt(hour2) - parseInt(hour1);
  let diffMin = parseInt(min2) - parseInt(min1);

  // account for a negative hour difference
  if (diffHour < 0) {
    diffHour += 24;
  }

  // account for negative minute difference
  if (diffMin < 0) {
    diffMin += 60;
    diffHour--;
  } else if (diffMin > 60) {
    diffMin -= 60;
    diffHour++;
  }

  return (diffHour + diffMin / 60).toFixed(1);
}
