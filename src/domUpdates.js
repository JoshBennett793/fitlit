const userInfo = document.querySelector(".data-box");

export function showUserData(user) {
  userInfo.innerHTML += `
  <p class="name">Name: ${user.name} </p>
  <p class="address"> Address: ${user.address}</p>
  <p class="email">Email: ${user.email}</p>
  `;
}


