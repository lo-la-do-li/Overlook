// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// IMPORT FILES
import './css/styles.scss';
import apiCalls from './apiCalls'
import User from './User'
import Manager from './Manager'
import Room from './Room'
import Booking from './Booking'

let users = []
let customers = []
let currentBookings = []
let availableRooms = []

const travelDateButton = document.querySelector('.button');
const travelInput = document.getElementById('travel-date');
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'
Promise.all([apiCalls.getUserData(), apiCalls.getRoomData(), apiCalls.getBookingData()])
.then((data) => {
  const dataSet = data.reduce((dataKeys, dataValue) => {
    return dataKeys = {...dataKeys, ...dataValue};
  }, {})

  currentBookings = dataSet.bookings;
  availableRooms = dataSet.rooms;
  users = dataSet.users

  console.log(Object.keys(dataSet));
  // instantiateData(dataSet);
  console.log(users[0]);
  console.log(availableRooms[0]);
  console.log(currentBookings[0]);
})

function instantiateData(data) {

  // customers = data.users.map(user => new User(user))
  // availableRooms = data.rooms.map(room => new Room(room))

}

travelDateButton.addEventListener('click', getValue)

function getValue() {
  let chosenDate = travelInput.value.replace(/-/g, "/")

  let roomBookings = currentBookings.filter(booking => booking.date === chosenDate)
  let unavailableRooms = roomBookings.map(booking => booking.roomNumber)

  unavailableRooms.forEach(roomNum => availableRooms.splice(availableRooms.findIndex(room => room.number === roomNum),1));

  console.log(availableRooms)
  displayAvailableRooms()
  // return availableRooms;
}

function displayAvailableRooms() {

const roomsDisplay = document.querySelector('.rooms-available')
roomsDisplay.innerHTML = ''
availableRooms.forEach(room => {
const roomCard =
`
<div class="w3-container">
  <div class="room-card">
    <div class="container">
      <div class="room-specs">
      <h5>${room.roomType}</h5>
      <div class="navFlex">
      <p><b>Room Number:</b></p>
      <p>${room.number}</p>
      </div>
      <div class="navFlex">
      <p><b>Bedsize:</b></p>
      <p> ${room.bedSize}</p>
      </div>
      <div class="navFlex">
      <p><b>Bed #:</b></p>
      <p>${" " + room.numBeds}</p>
      </div>
      <div class="navFlex">
      <p><b>Cost:</b></p>
      <p>${" $" + room.costPerNight}</p>
      </div>
      <input type="button" class="book-button" value="Book">
      </div>
    </div>
  </div>
</div>
`
roomsDisplay.insertAdjacentHTML('afterbegin', roomCard)
  })
}
// LOGIN SELECTORS, EventListeners, and FUNCTIONS
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
