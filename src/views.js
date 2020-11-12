//
// const views = {
//   hideElement: (className) => {
//     document.querySelector(`.${className}`).classList.add('hidden')
//   },
//
//   showElement: (className) => {
//     document.querySelector(`.${className}`).classList.remove('hidden')
//   },
//
//   viewSearchRooms: () => {
//     // hideElement('containFlex');
//     this.hideElement('welcome-msg');
//     // showElement('rooms-available');
//     this.showElement('rooms-available-section');
//     this.hideElement('search-users-section')
//     this.hideElement('manager-dashboard')
//     this.hideElement('customer-dashboard')
//     // showElement('search-bar');
//   },
//
//   viewSearchUsers: () => {
//     hideElement('manager-dashboard');
//     // hideElement('welcome-msg');
//     // hideElement('rooms-available');
//     hideElement('rooms-available-section')
//     showElement('search-users-section');
//     // hideElement('search-bar');
//     w3_close()
//     hideElement('welcome-msg');
//   },
//
//   openSideBar: () => {
//     searchBar.classList.remove('hidden');
//     hideElement('containFlex');
//     hideElement('welcome-msg');
//   },
//
//   managerLoginViewHandler: () => {
//     document.getElementById('login-section').style.display = 'none';
//     showElement('dashboard');
//     hideElement('search-users-section');
//     // hideElement('search-rooms')
//     hideElement('rooms-available-section')
//     hideElement('customer-dashboard')
//     w3_close()
//   },
//
//   customerLoginViewHandler: () => {
//     document.getElementById('login-section').style.display = 'none';
//     hideElement('search-users-tab');
//     hideElement('manager-dashboard');
//     showElement('dashboard');
//     document.querySelector('.search-users-tab').style.display = 'none';
//     hideElement('search-users-tab');
//     showElement('customer-dashboard');
//   }
// }
// export default views;
