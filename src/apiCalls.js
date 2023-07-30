import { displayError } from './domUpdates';
import { store, getAllApiData } from './scripts';
import { getUserData, getCurrentDate, calculateTotalTimeSlept } from './model';

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
          `There has been an error: ${response.status} ${response.statusText}`,
        );
      }
    })
    .then(data => data)
    .catch(error => {
      console.log(error);
      displayError(error);
    });
}

export function storeSleepData() {
  const sleepModalForm = document.querySelector('form');

  const formData = new FormData(sleepModalForm);
  const values = [...formData.entries()];
  const formattedValues = values.reduce((acc, value) => {
    acc[value[0]] = value[1];
    return acc;
  }, {});

  const totalTimeSlept = calculateTotalTimeSlept(
    formattedValues['begin-time'],
    formattedValues['end-time'],
  );

  const user = store.getKey('user');
  const sleepData = getUserData(
    'sleepData',
    store.getKey('sleepData'),
    user.id,
  );
  const nextDay = new Date(getCurrentDate(sleepData));
  nextDay.setDate(nextDay.getDate() + 1);
  const year = nextDay.toLocaleString('default', { year: 'numeric' });
  const month = nextDay.toLocaleString('default', { month: '2-digit' });
  const day = nextDay.toLocaleString('default', { day: '2-digit' });
  const date = `${year}/${month}/${day}`;

  setApiData(
    store.getAPIKey('sleep'),
    user.id,
    date,
    parseFloat(totalTimeSlept),
    Number(formattedValues['sleep-quality']),
  )
    .then(() => {
      store.getKey('todaysStepDataChart').destroy();
      store.getKey('weeklyStepDataChart').destroy();
      store.getKey('weeklySleepDataChart').destroy();
      store.getKey('weeklySleepQualityChart').destroy();
      store.getKey('weeklyHydrationDataChart').destroy();
      getAllApiData(store.getKey('user'));
    })
    .catch(err => console.log(err));
}
