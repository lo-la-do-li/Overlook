
// IMPORT FILES
import './css/styles.scss';
import apiCalls from './apiCalls'
import User from './User'
import HotelManagement from './HotelManagement'
import Room from './Room'
import Booking from './Booking'
// import views from './views'

//Variables
let customerIdToBook
let thisUser;
let dataSet;
let allBookings;
let allCustomers;
let allRooms;
let hotel;
let userType;
let idToken;
let validUser;
let deleteBtn;

let availableRooms = []
let currentBookings = []
let bookingRoomNumbers = []
let bookedRooms = []
let thisCustomer;
let userBooking;
let roomToBook;
let numberOfRooms;
let bookForCustomer

let searchResults = [];
let chosenDate;
let todayDate;
let customerSearchResults = [];

let newBookingData;
let bookButton;
let viewBookingsBtn;
let allSessionBookings = [];


//QuerySelectors
let travelDateButton = document.querySelector('.button');
let travelInput = document.getElementById('travel-date');
let roomsDisplay = document.querySelector('.rooms-available');
let roomsAvailableSection = document.querySelector('.rooms-available-section')
let searchUsersSection = document.querySelector('.search-users-section')
let searchBar2 = document.querySelector('.search-bar2')
let searchBar = document.querySelector('.search-bar')
let sideBarOpenBtn = document.getElementById('openNav')
let sideBarCloseBtn = document.querySelector('.side-bar-close')
let usersDocket = document.querySelector('.user-list')
let customerBookingHeader =document.querySelector('.customer-booking-for')

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
  const customers = data.users.map(customer => new User(customer));
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
sideBarOpenBtn.addEventListener('click', openSideBar)
window.addEventListener('click', buttonViewHandler)
searchBar2.addEventListener('input', searchCustomersByName)
searchBar.addEventListener('input', searchAvailableRooms)
// bookButton.addEventListener('click', bookARoom)

// VIEW HANDLERS & Navigation Functionality
function buttonViewHandler(event) {
  if (event.target === sideBarOpenBtn) {
    w3_open();
    // openSideBar();
  }
  if (event.target === sideBarCloseBtn) {
    w3_close();
  }
  if (event.target.classList.contains('customer-dash-tab')) {
    checkUserType('dash')
  }
  if (event.target.classList.contains('search-results-tab')) {
    checkUserType('search results')
  }
  if (event.target.classList.contains('search-users-tab')) {
    viewSearchUsers();
  }
  if (event.target.classList.contains('log-out-btn')) {
    logOut();
  }
}

function checkUserType(view) {
  console.log(userType)
  if (userType === 'manager' && view === 'dash') {
    viewManagerDash();
  }
  if (userType === 'customer' && view === 'dash') {
    viewCustomerDash();
  }
  if (userType === 'manager' && view === 'search results') {
    viewSearchRooms();
  }
  if (userType === 'customer' && view === 'search results') {
    viewSearchRooms();
  }
}

function viewCustomerDash() {
  hideElement('search-users-section');
  hideElement('rooms-available-section');
  showElement('containFlex');
  showElement('welcome-msg');
  showElement('customer-dashboard')

  // showElement('manager-dashboard');
}

function viewManagerDash() {
  hideElement('rooms-available-section');
  // hideElement('search-bar');
  // showElement('containFlex');
  // showElement('welcome-msg');
  w3_close()
  hideElement('customer-dashboard')
  showElement('manager-dashboard')
}


function viewSearchRooms() {

  // hideElement('containFlex');
  hideElement('welcome-msg');
  // showElement('rooms-available');
  showElement('rooms-available-section');
  hideElement('search-users-section')
  hideElement('manager-dashboard')
  hideElement('customer-dashboard')
  // showElement('search-bar');

}
function viewSearchUsers() {
  hideElement('manager-dashboard');
  // hideElement('welcome-msg');
  // hideElement('rooms-available');
  hideElement('rooms-available-section')
  showElement('search-users-section');
  // hideElement('search-bar');
  // w3_close();
  hideElement('welcome-msg');
}

function openSideBar() {
  searchBar.classList.remove('hidden');
  hideElement('containFlex');
  hideElement('welcome-msg');
}

function managerLoginViewHandler() {
  document.getElementById('login-section').style.display = 'none';
  showElement('dashboard');
  hideElement('search-users-section');
  // hideElement('search-rooms')
  hideElement('rooms-available-section')
  hideElement('customer-dashboard')
  w3_close()
}
function customerLoginViewHandler() {
  document.getElementById('login-section').style.display = 'none';
  hideElement('search-users-tab');
  hideElement('manager-dashboard');
  hideElement('rooms-available-section')
  showElement('dashboard');
  document.querySelector('.search-users-tab').style.display = 'none';
  hideElement('search-users-tab');
  showElement('customer-dashboard');
}

// USER & MANAGER FUNCTIONALITY: BOOKINGS AND ROOMS ------------------------------------------------
function filterBookingsByDate(date) {
  return hotel.allBookings.filter(booking => booking.date === date)
}

function searchRoomsByDate() {
  console.log(userType)
  chosenDate = travelInput.value.replace(/-/g, "/")
  findAvailableRooms();
  displayAvailableRooms(availableRooms);
}

function findAvailableRooms() {
  availableRooms = []
  currentBookings = filterBookingsByDate(chosenDate)
  // console.log('current bookings:', currentBookings)

  getRoomsFromBookings(currentBookings)
  // console.log('booked rooms:', bookedRooms)
  bookingRoomNumbers = currentBookings.map(booking => booking.roomNumber)
  // console.log('bookingRoomNumbers', bookingRoomNumbers)

  availableRooms = hotel.allRooms.filter(room => !bookingRoomNumbers.includes(room.number))
  console.log(availableRooms)

  return availableRooms
}
function displaySearchErrorMessage() {

}
function searchAvailableRooms(event) {
  let searchInput = event.target.value;
  hideElement('customer-dashboard')
  hideElement('manager-dashboard')

  let roomSearchResults = availableRooms.filter(room => {
    return (
      room.roomType.toLowerCase().includes(searchInput)
    );
  });

  displayAvailableRooms(roomSearchResults)
}

function selectRoomToBook(event) {
  if (event.target.classList.contains('book-button')) {
    roomToBook = event.target.closest('.available-room-container').id
    console.log('roomToBook', roomToBook)
    if (userType === 'manager') {
      console.log('this room is being booked for customer:', thisUser.id)

      bookARoom(thisUser, roomToBook, chosenDate)
      console.log(thisUser, roomToBook, chosenDate)
    }
    if (userType === 'customer') {
      console.log('this room is being booked for customer:', customerIdToBook)
      bookARoom(validUser, roomToBook, chosenDate)
      console.log(validUser, roomToBook, chosenDate)
      viewCustomerDash();
    }
  }

  function bookARoom(selectedUser, roomToBook, chosenDate) {
    newBookingData = {"userID": selectedUser.id, "date": chosenDate, "roomNumber": roomToBook}
    console.log('newBookingData', newBookingData)

    userBooking = new Booking(newBookingData)
    selectedUser.bookings.push(userBooking)
    console.log('selectedUser Bookings', selectedUser.bookings)

    console.log('availableRooms', availableRooms)

    let newRoomCount = availableRooms.splice(availableRooms.findIndex(room => room.number === userBooking.roomNumber), 1)
    console.log(newRoomCount)
    displayAvailableRooms(availableRooms)
    console.log(availableRooms)
    displayNewBooking(userBooking)
    apiCalls.addBookingData(newBookingData)
    // instantiateData(dataSet)
    //Don't Delete Below! - for API call, POST
    // apiCalls.addBookingData(newBookingData)
  }
}

// MANAGER FUNCTIONALITY: SEARCH USERS AND BOOK -----------------------------------
function viewUserBookings(event) {
  w3_close()
  let bookingsToView = event.target.closest('.customer-card').id
  // const closestElement = ('.room-card').closest('div');
  const content = event.target.closest('.collapsible')
  let bookingsContainer =  content.nextElementSibling;

  if (bookingsContainer.style.display === "block") {
    bookingsContainer.style.display = "none";
  } else {
    bookingsContainer.style.display = "block";
  }

  let thisCustomer = findCustomer(+bookingsToView)
  console.log(thisCustomer)
  let thisCustomersBookings = compileUserBookings(thisCustomer.id)
  console.log(thisCustomersBookings)
  sortBookingsByDate(thisCustomersBookings)
  thisCustomersBookings.forEach(booking => {
    let customerBooking =

    `
    <ul class="w3-ul w3-card-4">
    <li class="w3-display-container"id=${booking.id}>
    <div class="flexBooking" id=${booking.id}>
    <div>
    ${booking.id}
    </div>
    <div>
    ${booking.date}
    </div>
    <div>
    ${booking.roomNumber}
    </div>
    <button class="delete-btn w3-button w3-transparent w3-display-right">&times;</button>
    </div>
    </li>
    </ul>
    `
    bookingsContainer.insertAdjacentHTML('afterbegin', customerBooking)
    deleteBtn = document.querySelector('.delete-btn')
    deleteBtn.addEventListener('click', deleteBooking)
  })
}

function deleteBooking(event) {

  if (event.target.classList.contains('delete-btn')) {
  let customerBookingCard = event.target.parentElement.closest(".flexBooking")
  let bookingToDeleteID = event.target.parentElement.closest(".flexBooking").id
  console.log(bookingToDeleteID)
  let bookingToDelete = hotel.allBookings.find(booking => bookingToDeleteID === booking.id)
  console.log(bookingToDelete, findCustomer(bookingToDelete.userId))
  let thisUsersName = findCustomer(bookingToDelete.userId).name

  let removedBookingData = {"id": bookingToDelete.id}

  // apiCalls.deleteBookingData(removedBookingData)
  customerBookingCard.style.display='none'
  window.alert(`Booking for customer ${thisUsersName}, room${bookingToDelete.roomNumber} on ${bookingToDelete.date} has been deleted`)
  }
}

function searchCustomersByName(event) {
  console.log(hotel.allCustomers)
  let searchNameInput = event.target.value.toLowerCase()
  console.log(searchNameInput)
  customerSearchResults = hotel.allCustomers.filter(customer => {
    return customer.name.toLowerCase().includes(searchNameInput)

  });
  console.log(customerSearchResults)
  displayUsers(customerSearchResults);
}

function bookRoomForCustomer(event) {
  customerIdToBook = event.target.closest('.customer-card').id
  thisUser = findCustomer(+customerIdToBook)
  console.log('Here we goo', customerIdToBook, thisUser)
  customerBookingHeader.innerText = `${thisUser.name}`
  w3_open()
  viewSearchRooms()
  return thisUser
  // bookAroom(idToken)
}

function displaySearchUserError() {
  let errorCard =
  `<div class="room-specs">
  <h3>Sorry! No users match that name</h3>
  <input type="button" class="booking-btn" value="View Bookings">
  </div>
  `
  document.querySelector('user-list').insertAdjacentHTML('afterbegin', errorCard)
}

//MOVE TO domUpdates.js ------------------------------------------------

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

function displayTotalSpentOnBookings(customerBookings) {
  document.querySelector('.total-spent').innerHTML =
  '$' + `${getTotalSpentOnBookings(customerBookings)}`
}

function displayAvailableRooms(roomSet) {
  searchBar.classList.remove('hidden')
  roomsDisplay.innerHTML = ''
  roomSet.forEach(room => {
    const roomCard =
    `
    <div class="w3-container">
    <div class="room-card">
    <div class="available-room-container" id=${room.number}>
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
    bookButton.addEventListener('click', selectRoomToBook);
  })
}

function displayNewBooking(booking) {
  let userBookings = document.querySelector('.user-bookings')

  let newBookingCard =
  `
  <li class="w3-padding-large" id="${booking.id}"><span>Date: ${booking.date}, Room Number: ${booking.roomNumber}</span>
  </li>
  `
  userBookings.insertAdjacentHTML('afterbegin', newBookingCard)
}

function displayCustomerBookings(bookingSet) {
  instantiateData(dataSet)
  let userBookings = document.querySelector('.user-bookings')
  sortBookingsByDate(bookingSet)
  bookingSet.forEach(booking => {
    let bookingCard =

    `
    <li class="w3-padding-large" id="${booking.id}"><span>Date: ${booking.date}, Room Number: ${booking.roomNumber}</span>
    </li>
    `
    userBookings.insertAdjacentHTML('afterbegin', bookingCard)
  })
}

function displayUsers(users) {
  console.log(users)
  usersDocket.innerHTML = ''
  users.forEach(user => {

    let userCard =
    `
    <div class="w3-container">
    <div class="customer-card collapsible" id=${user.id}>
    <div class="container">
    <div class="customer-specs" id=${user.id}>
    <h3>${user.name}</h3>
    <div>
    <input type="button" class="bookings-btn" value="View Bookings">
    <input type="button" class="book-customer-button" value="Book Room">
    </div>
    </div>
    </div>
    </div>
    <div class="content">
    <ul class="w3-ul w3-card-4">
    <li class="w3-display-container">
    <div class="flexBooking">
    <div>
    <b>Booking ID</b>
    </div>
    <div>
    <b>Booking Date</b>
    </div>
    <div>
    <b>Room Number</b>
    </div>
    <div>
    <b>Delete Booking</b>
    </div>
    </div>
    </li>
    </ul>
    </div>
    </div>
    `
    usersDocket.insertAdjacentHTML('afterbegin', userCard)
    viewBookingsBtn = document.querySelector('.bookings-btn');
    bookForCustomer = document.querySelector('.book-customer-button');
    viewBookingsBtn.addEventListener('click', viewUserBookings);
    bookForCustomer.addEventListener('click', bookRoomForCustomer);
  })
}

// CUSTOMER and MANAGER DASHBOARD - RETRIEVE DATA FUNCTIONS ------------

// MANAGER
function getTodayDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = yyyy + '/' + mm + '/' + dd;
  return today
}

function getTotalRevenue() {
  let totalDailyRevenue = bookedRooms.reduce((totalRevenue, room) => {
    totalRevenue += room.costPerNight
    return totalRevenue
  }, 0)
  console.log('total Daily Revenue', totalDailyRevenue)
  return totalDailyRevenue.toFixed(2);
}

function getRoomsFromBookings(bookings) {
  bookedRooms = bookings.reduce((allRoomsTaken, bookedRoom) => {
    bookedRoom = hotel.allRooms.find(room => bookedRoom.roomNumber === room.number)
    allRoomsTaken.push(bookedRoom)
    return allRoomsTaken
  },[])
  return bookedRooms
}

function getHotelStatsByDate(date) {
  currentBookings = filterBookingsByDate(chosenDate)
  getRoomsFromBookings(currentBookings)
  let totalRevenue = getTotalRevenue()

  let roomsAvailableToday = findAvailableRooms()
  // console.log('rooms available today:', roomsAvailableToday)

  const initNumberOfRooms = hotel.allRooms.length
  let numberOfBookedRooms = roomsAvailableToday.length
  // console.log('number of booked rooms', numberOfBookedRooms)
  let percentBooked = Math.floor(((initNumberOfRooms - numberOfBookedRooms)/ initNumberOfRooms * 100))

  displayHotelStats(numberOfBookedRooms, percentBooked, totalRevenue)
}

// CUSTOMER
function findCustomer(idNum) {
  return hotel.allCustomers.find(customer => customer.id === idNum)
}
function displayCustomerName(customer) {
  return document.querySelector('.welcome-msg').innerText = `Welcome Back, ${customer.getFirstName()}!`
}

function compileUserBookings(idNum) {
  let customer = findCustomer(idNum)
  let foundBookings = hotel.allBookings.filter(booking => customer.id === booking.userId)
  customer.bookings = foundBookings
  // console.log(customer.bookings)
  return customer.bookings
}

function sortBookingsByDate(bookingSet) {
  let bookingsByDate = bookingSet.sort((bookingA, bookingB) => {
    return new Date(bookingA.date) - new Date(bookingB.date)
  })
  return bookingsByDate
}

function getTotalSpentOnBookings(customerBookings) {
  let customerBookedRooms = getRoomsFromBookings(customerBookings)
  // console.log(customerBookedRooms)
  let totalSpentOnBookings = customerBookedRooms.reduce((totalSpent, room) => {
    totalSpent += room.costPerNight
    return totalSpent
  }, 0)
  return totalSpentOnBookings.toFixed(2)
}

// LOGIN ACCESS: SELECTORS, EventListeners, and FUNCTIONS

const loginForm = document.getElementById('login-form');
const loginButton = document.getElementById('login-form-submit');
const loginErrorMsg = document.getElementById('login-error-msg');

loginButton.addEventListener('click', grantAccess);

function grantAccess(event) {
  event.preventDefault();
  let username = loginForm.username.value;
  let password = loginForm.password.value;

  userType = username.split('').splice(0, 8).join('').toLowerCase();
  idToken = parseInt(username.slice([8]));
  validUser = findCustomer(idToken)
  console.log(userType, idToken, validUser)

  if (password !== 'overlook2020') {
    showLoginErrorMsg();
    return;
  }
  if (userType === 'manager') {

    alert('You have successfully logged in as a manager.');
    userType = 'manager'
    todayDate = getTodayDate();
    chosenDate = "2020/02/07";

    managerLoginViewHandler();
    getHotelStatsByDate(chosenDate)
    displayUsers(hotel.allCustomers)

  } if (userType === 'customer' && validUser) {
    alert('You have successfully logged in as a customer.');
    customerLoginViewHandler();

    const customerBookings = compileUserBookings(validUser.id)
    userType = 'customer'
    getTotalSpentOnBookings(customerBookings);
    sortBookingsByDate(customerBookings)
    displayCustomerBookings(customerBookings);
    displayTotalSpentOnBookings(customerBookings);
    displayCustomerName(validUser)

  } else {
    showLoginErrorMsg()
  }
}

function showLoginErrorMsg() {
  loginErrorMsg.style.opacity = 1;
}

function logOut() {
  location.reload()
}
function w3_open() {
  viewSearchRooms()
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
