// Utility Functions

function getRandomID(array) {
  return Math.floor(Math.random() * array.length) + 1;
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
    weeklyData = userData.slice(indexOfDate - 6);
  }

  weeklyData.reverse();
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
