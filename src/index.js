// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
// import './css/base.scss';
import './css/styles.scss';
import apiCalls from './apiCalls'

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'
Promise.all([apiCalls.getUserData(), apiCalls.getRoomData(), apiCalls.getBookingData()])
  .then((data) => {
    const dataSet = data.reduce((dataList, dataItem) => {
      return dataList = {...dataList, ...dataItem};
    }, {})
    console.log(dataSet);
  })

const loginForm = document.getElementById('login-form');
const loginButton = document.getElementById('login-form-submit');
const loginErrorMsg = document.getElementById('login-error-msg');

loginButton.addEventListener('click', grantAccess);

function grantAccess(event) {
  event.preventDefault();
  const username = loginForm.username.value;
  const password = loginForm.password.value;

  if (username === 'manager' && password === 'overlook2020') {
    alert('You have successfully logged in as a manager.');
    document.getElementById('main-holder').style.visibility = 'hidden';
  }
  else if (username === 'customer' && password === 'overlook2020') {
    alert('You have successfully logged in as a customer.');

    document.getElementById('login-section').style.display = 'none';
    document.querySelector('.dashboard').classList.remove('hidden');
  } else {
    showLoginErrorMsg()
  }
}

function showLoginErrorMsg() {
  loginErrorMsg.style.opacity = 1;
}
function w3_open() {
  document.getElementById("main").style.marginLeft = "25%";
  document.getElementById("mySidebar").style.width = "25%";
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("openNav").style.display = 'none';
}
function w3_close() {
  document.getElementById("main").style.marginLeft = "0%";
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("openNav").style.display = "inline-block";
}
