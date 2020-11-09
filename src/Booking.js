class Booking {
  constructor(booking) {
    this.id = booking.id;
    this.userId = booking.userID;
    this.date = booking.date;
    this.roomNumber = booking.roomNumber;
    this.roomServiceCharges = booking.roomServiceCharges || [];
  }
  // getUserId() {
  // return this.users.find(user => user.id === id)
}
export default Booking;
