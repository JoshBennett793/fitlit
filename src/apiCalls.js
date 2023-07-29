import { displayError } from './domUpdates';

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
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      // IF FORM IS SUBMITTED WITH MISSING INFORMATION
      if (response.status === 422) {
        throw new Error('The form is missing 1 or more pieces of information.');
        // NETWORK ERROR
      } else if (response.status >= 500) {
        throw new Error(
          `There has been a network error: ${response.status} ${response.statusText}. Please refresh the page or try again later.`,
        );
      } else {
        // ALL OTHER ERRORS
        throw new Error(
          `There that been an error: ${response.status} ${response.statusText}`,
        );
      }
    })
    .then(data => data)
    .catch(error => {
      console.log(error);
      displayError(error);
    });
}
