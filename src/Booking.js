class Booking {
  constructor(booking) {
    this.id = booking.id || 'unknown';
    this.userId = booking.userID;
    this.date = booking.date;
    this.roomNumber = booking.roomNumber;
    this.roomServiceCharges = booking.roomServiceCharges || [];
  }
}
export default Booking;
