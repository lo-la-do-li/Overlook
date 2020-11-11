
import { expect } from 'chai';

import User from '../src/User';
import Room from '../src/Room';
import Booking from '../src/Booking';

describe('User', () => {
  let user, room1, room2, room3, rooms, booking1, booking2, booking3, bookings;

  beforeEach(() => {
    user = new User({id: 9, name: 'Maxie Torp', bookings: []})
    room1 = new Room({
      "number": 1,
      "roomType": "suite",
      "bidet": true,
      "bedSize": "queen",
      "numBeds": 1,
      "costPerNight": 345.72
    })
    room2 = new Room({
      "number": 2,
      "roomType": "suite",
      "bidet": false,
      "bedSize": "king",
      "numBeds": 1,
      "costPerNight": 545.72
    })

    rooms = [room1, room2]

    booking1 = {  
      "id": "5fwrgu4i7k55hl6sz", 
      "userID": 9, 
      "date": "2020/02/01", 
      "roomNumber": 1,
      "roomServiceCharges": []
    }

    booking2 = {
      "id": "5fwrgu4i7k55hl6t5",
      "userID": 43,
      "date": "2020/02/01",
      "roomNumber": 2,
      "roomServiceCharges": []
    }
    bookings = [booking1, booking2]
  });

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should be an instance of user', () => {
    expect(user).to.be.an.instanceof(User);
  });

  it('should have an id', () => {
    expect(user.id).to.equal(9);
  });

  it('should have a name', () => {
    expect(user.name).to.equal('Maxie Torp');
  });

  it('should have an array of bookings set to empty by default', () => {
    expect(user.bookings.length).to.equal(0);
  });
  it('should be able to return its first name', () => {
    expect(user.getFirstName()).to.equal('Maxie');
  });
  it('should be able to search for available rooms by date', () => {
    expect(user.findARoom('2020/02/01', bookings, rooms).to.deep.equal([room1, room2]))
  });
});
