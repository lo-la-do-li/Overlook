const getData = (path) => {
  return fetch(path)
  .then(response => response.json())
  .catch(err => console.log(err))
}

const addData = (path, data) => {
  return fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .catch(err => console.log(err))
}

const deleteData = (path, data) => {
  return feth(path, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .catch(error => console.log(error))
}

const apiCalls = {

  getUserData: () => {
    return getData('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
  },

  getRoomData: () => {
    return getData('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
  },

  getBookingData: () => {
    return getData('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
  },

  addBookingData: (bookingData) => {
    return addData('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', bookingData)
  },

  deleteBookingData: (bookingData) => {
    return deleteData('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', bookingData)
  }
}

export default apiCalls;
