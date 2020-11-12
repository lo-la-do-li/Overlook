import { expect } from 'chai';
// import User from '../src/User';
import Room from '../src/Room';
import Booking from '../src/Booking';

describe('Booking', () => {
  let booking;

  beforeEach(() => {
    booking = new Booking({"id": "5fwrgu4i7k55hl6tl", "userID": 3, "date": "2020/01/10", "roomNumber": 8, "roomServiceCharges": []});
  });

  it('should be a function', () => {
    expect(Booking).to.be.a('function');
  });

  it('should be an instance of a Booking class', () => {
    expect(booking).to.be.a.instanceOf(Booking);
  });

  it('should have an id that is a string', () => {
    expect(booking.id).to.be.a('string');
  });

  it('should have an id of 17 alphanumeric characters', () => {
    expect(booking.id.length).to.equal(17);
  });

  it('should have a user ID', () => {
    expect(booking.userID).to.be.a('number');
    expect(booking.userID).to.equal(3);
  });

  it('should have a date', () => {
    expect(booking.date).to.equal("2020/01/10");
  });

  it('should have a room number', () => {
    expect(booking.roomNumber).to.equal(8);
    expect(booking.roomNumber).to.be.a('number');
  });

  it('should have no room service charges by default', () => {
    expect(booking.roomServiceCharges).to.deep.equal([]);
  });
});
