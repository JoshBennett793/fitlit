/* User Data */

export function getUserData(dataType, users, id) {
  if (
    dataType === 'hydrationData' ||
    dataType === 'sleepData' ||
    dataType === 'activityData'
  ) {
    return users.filter(data => data.userID === id);
  } else {
    return users.find(data => data.id === id);
  }
}

function getRandomID(array) {
  return Math.floor(Math.random() * array.length) + 1;
}

export function getRandomUser(users) {
  return getUserData('users', users, getRandomID(users));
}

export function getCurrentDate(userData) {
  return userData[userData.length - 1].date;
}

export function getAllTimeAverage(key, userData) {
  if (!userData.length) {
    return 0;
  }

  const avg = userData.reduce((sum, date) => sum + date[key], 0) / userData.length;

  if(key === 'numOunces' || key === 'dailyStepGoal') {
    return Math.round(avg);
  } else {
    return parseFloat(avg.toFixed(1));
  }
}

export function getTodays(key, userData, date) {
  userData = userData.find((data) => data.date === date);

  if (!userData) {
    return 0;
  }

  return userData[key];
}

export function getWeekly(key, userData, date) {
  userData.sort((a, b) => new Date(a.date) - new Date(b.date));

  const indexOfDate = userData.findIndex((entry) => entry.date === date);
  
  let weeklyData;
  if (userData.length <= 7) {
    weeklyData = userData.slice(0, indexOfDate);
   } else {
     weeklyData = userData.slice(indexOfDate - 6, indexOfDate);
   }

  weeklyData.reverse();
  return weeklyData.reduce((week, day) => {
    week[day.date] = day[key];
    return week;
  }, {});
}


/* Step Data */

export function getUserStepGoal(user) {
  return user.dailyStepGoal;
}

/* Water Data */

// export function getWeeklyWater(userData) {
//   userData = userData.slice(-7, -1);

 


/* Sleep Data */

// export function getWeeklySleep(userData, date) {
//   let weeklyData;

  
 

export function getDailySleep(sleepData, data) {
  const userData = sleepData.find(date => data === date.date);
//   weeklyData.reverse();

//   return weeklyData.reduce((acc, day) => {
//     acc[day.date] = day.hoursSlept;
//     return acc;
//   }, {});
}

export function getSleepQuality(sleepData, date) {
  const userData = sleepData.find(data => data.date === date);
  return userData.sleepQuality;
}

export function getWeeklySleep(userData, date) {
  const startCount = userData.findIndex((entry) => entry.date === date);
  const weeklyData = userData.slice(startCount, startCount + 7).reverse();

  return weeklyData.reduce((acc, day) => {
    acc[day.date] = day.hoursSlept;
    return acc;
  }, {});
}

export function getWeeklySleepQuality(userData) {
  userData.sort((a, b) => new Date(b.date) - new Date(a.date));

  return userData.reduce((week, day) => {
    week[day.date] = day.hoursSlept;
    return week;
  }, {});
}
  /* Activity Data */

export function getActivityDataByDate(activityData, id, date) {
  return getUserData('activityData', activityData, id).find(
    data => data.date === date,
  );
}

export function getMinutesActive(activityData) {
  return activityData.minutesActive;
}

export function compareStepsWithGoal(userData, activityData) {
  if (userData.dailyStepGoal <= activityData.numSteps) {
    return true;
  }

  return false;
}

// Accepts a single user's data as userData param
// Accepts all activity data
export function calculateDistanceTraveled(userData, date, activityData) {
  const mile = 5280;
  activityData = getActivityDataByDate(activityData, userData.id, date);
  const distance = (userData.strideLength * activityData.numSteps) / mile;
  return parseFloat(distance.toFixed(2));
}
