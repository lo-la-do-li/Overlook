class User {
  constructor(id, name, bookings) {
    this.id = id,
    this.name = name,
    this.bookings = bookings || []
  }
  findARoom(date, bookings, rooms) {
    return bookings.reduce((unavailableRooms, booking) => {
      let availableRooms = rooms.reduce()
      if (date === booking.date) {
        unavailableRooms.push(booking.roomNumber)
      }
      else if (date !== booking.date) {
        
      }
    console.log(unavailableRooms)
    return unavailableRooms
}, [])

}

  bookARoom(booking) {

  }
}

export default User;
