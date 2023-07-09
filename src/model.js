export function getUserData(users, id) {
  return users.find(user => user.id === id);
}

export function getAverageWater(hydrationData, id) {
  const userData = hydrationData.filter(data => data.userID === id); 
  return userData.reduce((sum, date) => sum + date.numOunces, 0) / userData.length;
}