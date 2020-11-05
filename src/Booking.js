class Booking {
  constructor(booking, user) {
    this.id = booking.id;
    this.userId = user.id;
    this.date = booking.date;
    this.roomNumber = booking.roomNumber;
    this.roomServiceCharges = [];
  }
}
export default Booking;
