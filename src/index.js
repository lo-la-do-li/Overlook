// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// IMPORT FILES
import './css/styles.scss';
import apiCalls from './apiCalls'
import User from './User'
import Manager from './Manager'
import Room from './Room'
import Booking from './Booking'

//Variables
let dataSet
let users = []
let roomsAvail = []
let userBooking
let roomToBook
let numberOfRooms
// let customers = []
let searchResults = [];
let chosenDate;
let currentBookings = []
let availableRooms = []
let newBookingData;
let bookButton;
let allSessionBookings = []

//QuerySelectors
let travelDateButton = document.querySelector('.button');
let travelInput = document.getElementById('travel-date');
let roomsDisplay = document.querySelector('.rooms-available');
let roomsAvailableSection = document.querySelector('.rooms-available-section')
// let customerDashBoard = document.querySelector('.customer-dashboard')
// let managerDashboard = document.querySelector('.manager-dashboard')
let searchBar = document.querySelector('.search-bar')
let sideBarButton = document.querySelector('.side-bar-btn')

//Initial APIS
Promise.all([apiCalls.getUserData(), apiCalls.getRoomData(), apiCalls.getBookingData()])
.then((data) => {
  dataSet = data.reduce((dataKeys, dataValue) => {
    return dataKeys = {...dataKeys, ...dataValue};
  }, {})
  currentBookings = dataSet.bookings;
  // availableRooms = dataSet.rooms;
  // users = dataSet.users
  instantiateData(dataSet);
  console.log(users[0]);
  let roomTypes = new Set(availableRooms.map(room => room.roomType))
  console.log(roomTypes);
  console.log(currentBookings[0]);
})

function onLoadHandler() {
  hideElement('dashboard');
}

function hideElement(className) {
  document.querySelector(`.${className}`).classList.add('hidden')
}

function showElement(className) {
  document.querySelector(`.${className}`).classList.remove('hidden')
}

function instantiateData(data) {
  users = data.users.map(user => new User(user))
  availableRooms = data.rooms.map(room => new Room(room))
}

// EVENT LISTENERS
window.addEventListener('load', onLoadHandler)
travelDateButton.addEventListener('click', travelSearchFunction)
sideBarButton.addEventListener('click', openSideBar)
window.addEventListener('click', buttonViewHandler)
searchBar.addEventListener('input', searchAvailableRooms)
// bookButton.addEventListener('click', bookARoom)

//Navigation Functionality
function buttonViewHandler(event) {
  if (event.target === sideBarButton) {
    openSideBar();
  }
  if (event.target.classList.contains('customer-dash-tab')) {
    viewCustomerDash();
  }
  if (event.target.classList.contains('search-results-tab')) {
    viewSearchRooms();
  }
  if (event.target.classList.contains('log-out-btn')) {
    logOut();
  }
}
function logOut() {
  hideElement('dashboard');
  document.getElementById('login-section').style.display = 'flex';
}
function viewCustomerDash() {
  showElement('containFlex');
  hideElement('rooms-available');
  hideElement('search-bar');
  w3_close();
}
function viewSearchRooms() {
  hideElement('containFlex');
  showElement('rooms-available');
  showElement('search-bar');
  w3_open();
}
function openSideBar() {
  searchBar.classList.remove('hidden')
  hideElement('containFlex')
  // customerDashBoard.classList.add('hidden')
}

function travelSearchFunction () {
  chosenDate = travelInput.value.replace(/-/g, "/")
  findAvailableRooms()

}

function findAvailableRooms() {
  instantiateData(dataSet)
  // travelInput.innerHTML = ''
  console.log(chosenDate)
  let roomBookings = currentBookings.filter(booking => booking.date === chosenDate)
  console.log(roomBookings)
  let unavailableRooms = roomBookings.map(booking => booking.roomNumber)
  console.log(unavailableRooms)

  unavailableRooms.forEach(roomNum => availableRooms.splice(availableRooms.findIndex(room => room.number === roomNum),1))
  numberOfRooms = availableRooms.length
  displayNumberOfRooms(numberOfRooms)
  console.log(availableRooms)
  console.log(chosenDate, availableRooms)
  displayAvailableRooms(availableRooms)
}

function displayNumberOfRooms(number) {
  document.querySelector('.totalRooms').innerHTML = number

}


function bookARoom(event) {
  console.log(chosenDate)
  if (event.target.classList.contains('book-button')) {
    roomToBook = event.target.closest('.room-card').id
    // let roomNumber = parseInt(roomToBook)
    console.log(roomToBook)
    newBookingData = {"userID": 2, "date": chosenDate, "roomNumber": roomToBook}
    console.log(newBookingData)
    // let goodByeRoom = availableRooms.findIndex(roomToBook)
    // console.log(goodByeRoom)
    userBooking = new Booking(newBookingData)
    allSessionBookings.push(userBooking)
    console.log(allSessionBookings)


    console.log(availableRooms)
    // updateAvailBookings()

    let newRoomCount = availableRooms.splice(availableRooms.findIndex(room => room.number === userBooking.roomNumber), 1)
    console.log(newRoomCount)
    displayAvailableRooms(availableRooms)
    console.log(availableRooms)
    // allSessionBookings.push(newRoomCount.number)
    // updateAvailBookings()
    displayNewBooking(userBooking)
    viewCustomerDash();

    // apiCalls.addBookingData(newBookingData)
  }
}

function updateAvailBookings() {
  instantiateData(dataSet)
  console.log(availableRooms)
  console.log(allSessionBookings)
  // let roomBookings = currentBookings.filter(booking => booking.date === chosenDate)
  // console.log(roomBookings)
  // let unavailbook = roomBookings.map(booking => booking.roomNumber)
  // allSessionBookings.forEach(roomNum => availableRooms.splice(availableRooms.findIndex(room => room.number === roomNum),1))
}

function searchAvailableRooms(event) {
  let searchInput = event.target.value;

  searchResults = availableRooms.reduce((searchMatches, room) => {
    if (searchInput === room.roomType) {
      console.log(room)
      searchMatches.push(room)
    }
    console.log(searchMatches)
    return searchMatches
  }, [])

  displayAvailableRooms(searchResults)
}

//MOVE TO domUpdates.js
function displayAvailableRooms(roomsAvail) {
  searchBar.classList.remove('hidden')
  roomsDisplay.innerHTML = ''
  roomsAvail.forEach(room => {
    const roomCard =
    `
    <div class="w3-container">
    <div class="room-card" id=${room.number}>
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
    <p> ${room.numBeds}</p>
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
    roomsDisplay.insertAdjacentHTML('afterbegin', roomCard);
    bookButton = document.querySelector('.book-button');
    bookButton.addEventListener('click', bookARoom);
  })
}

function displayNewBooking(booking) {
  let customerBookings = document.querySelector('.user-bookings')

  let bookingCard =
  `
  <li class="w3-padding-large"><span>Date: ${booking.date}, Room Number: ${booking.roomNumber}</span>
  </li>
  `
  customerBookings.insertAdjacentHTML('afterbegin', bookingCard)
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

  function getTodayDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '/' + mm + '/' + dd;
    return today
  }

  if (username === 'manager' && password === 'overlook2020') {
    alert('You have successfully logged in as a manager.');
    document.getElementById('login-section').style.display = 'none';
    showElement('dashboard');
    hideElement('rooms-available-section');
    // hideElement('customer-dashboard');

    // chosenDate = getTodayDate()
    chosenDate = "2020/02/05"
    findAvailableRooms()
  }
  else if (username === 'customer' && password === 'overlook2020') {
    alert('You have successfully logged in as a customer.');

    document.getElementById('login-section').style.display = 'none';
    showElement('dashboard');
    showElement('customer-dashboard');
    hideElement('manager-dashboard');
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
