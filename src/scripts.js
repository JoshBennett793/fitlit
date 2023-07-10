import './css/styles.css';
import { showUserData, showUserStepsVsAvg } from './domUpdates';
import { getRandomUser, getUserStepGoal, getAllAvgSteps } from './model';
import userData from './data/users';
import hydrationData from './data/hydration';

const store = {
  userData: userData.users,
  hydrationData: hydrationData.hydrationData,
  user: getRandomUser(userData.users),
};

window.onload = () => {
  const userSteps = store.user.dailyStepGoal;
  const avg = getAllAvgSteps(store.userData);

  showUserData(store.user);
  showUserStepsVsAvg(userSteps, avg);
};
