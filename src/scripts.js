import { showUserData } from './domUpdates'
import { getUserData } from './model'
import userData from './data/users';

const id = 1
console.log(userData)
const user = getUserData(userData.users, id)
showUserData(user)

// An example of how you tell webpack to use a CSS file
import './css/styles.css';
import './images/turing-logo.png';

// An example of how you tell webpack to use a JS file
