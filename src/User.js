class User {
  constructor(customer) {
    this.id = customer.id,
    this.name = customer.name,
    this.bookings = customer.bookings || []
  }
  getFirstName() {
   let firstName = this.name.split(' ');
   return firstName[0];
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
