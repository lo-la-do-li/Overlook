
// IMPORT FILES
import './css/styles.scss';
import apiCalls from './apiCalls'
import User from './User'
import HotelManagement from './HotelManagement'
import Room from './Room'
import Booking from './Booking'

//Variables
let dataSet;
let allBookings;
let allCustomers;
let allRooms;
let hotel;

let availableRooms = []
let currentBookings = []
let bookingRoomNumbers = []
let bookedRooms = []


let userBooking;
let roomToBook;
let numberOfRooms;

let searchResults = [];
let chosenDate;
let todayDate;

let newBookingData;
let bookButton;
let allSessionBookings = [];



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
  dataSet = data.reduce((dataType, dataValue) => {
    return dataType = {...dataType, ...dataValue};
  }, {})

  instantiateData(dataSet);
  console.log(hotel)
})

function onLoadHandler() {
  hideElement('dashboard');
}

function instantiateData(data) {
  const customers = data.users.map(user => new User(user));
  const rooms = data.rooms.map(room => new Room(room));
  const bookings = data.bookings.map(booking => new Booking(booking));
  allCustomers = customers
  allBookings = bookings
  allRooms = rooms
  hotel = new HotelManagement(allCustomers, allRooms, allBookings);
}


// EVENT LISTENERS
window.addEventListener('load', onLoadHandler)
travelDateButton.addEventListener('click', searchRoomsByDate)
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
  // w3_close();
}
function viewSearchRooms() {
  hideElement('containFlex');
  showElement('rooms-available');
  showElement('search-bar');
  // w3_open();
}
function openSideBar() {
  searchBar.classList.remove('hidden')
  hideElement('containFlex')
}

function searchRoomsByDate () {
  chosenDate = travelInput.value.replace(/-/g, "/")
  findAvailableRooms();
  displayAvailableRooms(availableRooms);
}

//BOOKINGS AND ROOMS
function filterBookingsByDate(date) {
return hotel.allBookings.filter(booking => booking.date === date)
}

function getTotalRevenue() {
  let totalDailyRevenue = bookedRooms.reduce((totalRevenue, room) => {
    totalRevenue += room.costPerNight
    console.log(room.number,':', room.costPerNight)
    return totalRevenue
  }, 0)
  console.log('total Daily Revenue', totalDailyRevenue)
  return totalDailyRevenue.toFixed(2);
}

function getRoomsFromBookings(bookings) {
  bookedRooms = bookings.reduce((acc, bookedRoom) => {
    bookedRoom = hotel.allRooms.find(room => bookedRoom.roomNumber === room.number)
     acc.push(bookedRoom)
     return acc
  },[])
  return bookedRooms
}

function getHotelStatsByDate(date) {
  currentBookings = filterBookingsByDate(chosenDate)
  getRoomsFromBookings(currentBookings)
  let totalRevenue = getTotalRevenue()

  let roomsAvailableToday = findAvailableRooms()
  // console.log('rooms available today:', roomsAvailableToday)

  let initNumberOfRooms = hotel.allRooms.length
  let numberOfBookedRooms = roomsAvailableToday.length
  // console.log('number of booked rooms', numberOfBookedRooms)
  let percentBooked = Math.floor(((initNumberOfRooms - numberOfBookedRooms)/ initNumberOfRooms * 100))

  displayHotelStats(numberOfBookedRooms, percentBooked, totalRevenue)
}

function findAvailableRooms() {
  console.log('hotel.allRooms', hotel.allRooms)

  currentBookings = filterBookingsByDate(chosenDate)
  console.log('current bookings:', currentBookings)

  getRoomsFromBookings(currentBookings)
  console.log('booked rooms:', bookedRooms)

  bookingRoomNumbers = currentBookings.map(booking => booking.roomNumber)
  console.log('bookingRoomNumbers', bookingRoomNumbers)

  availableRooms = hotel.allRooms.reduce((acc, availableRoom) => {
      if(!bookingRoomNumbers.includes(availableRoom.number))
       acc.push(availableRoom)
       return acc
    },[])
  console.log('available rooms:', availableRooms)
    return availableRooms
}

function bookARoom(event) {
  // console.log(chosenDate)
  if (event.target.classList.contains('book-button')) {
    roomToBook = event.target.closest('.room-card').id
    // let roomNumber = parseInt(roomToBook)
    console.log('roomToBook', roomToBook)
    newBookingData = {"userID": 2, "date": chosenDate, "roomNumber": roomToBook}
    console.log('newBookingData', newBookingData)

    userBooking = new Booking(newBookingData)
    allSessionBookings.push(userBooking)
    console.log('allSessionBookings', allSessionBookings)

    console.log('availableRooms', availableRooms)
    // updateAvailBookings()

    let newRoomCount = availableRooms.splice(availableRooms.findIndex(room => room.number === userBooking.roomNumber), 1)
    console.log(newRoomCount)
    displayAvailableRooms(availableRooms)
    console.log(availableRooms)
    // allSessionBookings.push(newRoomCount.number)
    // updateAvailBookings()
    displayNewBooking(userBooking)
    viewCustomerDash();
    //Don't Delete Below! - for API call, POST
    // apiCalls.addBookingData(newBookingData)
  }
}

function updateAvailBookings() {
  // instantiateData(dataSet)
  console.log(availableRooms)
  console.log(allSessionBookings)
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
function hideElement(className) {
  document.querySelector(`.${className}`).classList.add('hidden')
}

function showElement(className) {
  document.querySelector(`.${className}`).classList.remove('hidden')
}

function displayHotelStats(numberOfRooms, percentBooked, totalRevenue) {
  document.querySelector('.total-rooms').innerHTML = numberOfRooms
  document.querySelector('.percent-booked').innerHTML = `${percentBooked}%`
  document.querySelector('.total-revenue').innerHTML = '$' + totalRevenue

}

function displayAvailableRooms(roomSet) {
  searchBar.classList.remove('hidden')
  roomsDisplay.innerHTML = ''
  roomSet.forEach(room => {
    const roomCard =
    `
    <div class="w3-container">
    <div class="room-card" id=${room.number}>
    <div class="container">
    <div class="room-specs">
    <h3>${room.roomType}</h3>
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
    var mm = String(today.getMonth() + 1).padStart(2, '0');
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

    // todayDate = getTodayDate();
    chosenDate = "2020/02/01";
    getHotelStatsByDate(chosenDate)
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
