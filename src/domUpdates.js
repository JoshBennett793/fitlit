const userInfo = document.querySelector('.data-box')

export function showUserData(user) {
  console.log(user)
  userInfo.innerHTML = '';
  userInfo.innerHTML += `<p class="name">Name:${user.name} </p>
  <p class="address"> Address:${user.address}</p>
  <p class="email">Email:${user.email}</p>`

}

// showUserData(user)

const exampleFunction1 = (person) => {
  console.log(`oh hi there ${person}`)
}

const exampleFunction2 = (person) => {
  console.log(`bye now ${person}`)
}


// export {
//   exampleFunction1,
//   exampleFunction2,
// }