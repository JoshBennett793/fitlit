export function getApiData(url, dataKey) {
  return fetch(url)
    .then(response => response.json())
    .then(data => data[dataKey]);
}

export function setApiData(url, userID, date, hoursSlept, sleepQuality) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      userID,
      date,
      hoursSlept,
      sleepQuality,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log('error', error));
}
