import { expect } from 'chai';

import User from '../src/User';
import Room from '../src/Room';
import Booking from '../src/Booking';
import HotelManagement from '../src/HotelManagement';

describe('HotelManagement', () => {
  let customer1, customer2, customers, room1, room2, room3, rooms, booking1, booking2, booking3, bookings, hotel;

  beforeEach(() => {
    customer1 = new User({id: 9, name: 'Maxie Torp', bookings: []})
    customer2 = new User({id: 1, name: "Leatha Ullrich", bookings: []})
    customers = [customer1, customer2]
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
    room3 = new Room({
      "number": 3,
      "roomType": "suite",
      "bidet": true,
      "bedSize": "double",
      "numBeds": 1,
      "costPerNight": 145.72
    })

    rooms = [room1, room2, room3]

    booking1 = new Booking({  
      "id": "5fwrgu4i7k55hl6sz", 
      "userID": 9, 
      "date": "2020/02/01", 
      "roomNumber": 1,
      "roomServiceCharges": []
    })

    booking2 = new Booking({
      "id": "5fwrgu4i7k55hl6t5",
      "userID": 43,
      "date": "2020/02/01",
      "roomNumber": 2,
      "roomServiceCharges": []
    })

    booking3 = new Booking({
      "id": "5fwrgu4i7k55hl6t6",
      "userID": 13,
      "date": "2020/02/03",
      "roomNumber": 3,
      "roomServiceCharges": []
    })

    bookings = [booking1, booking2, booking3];
    hotel = new HotelManagement(customers, rooms, bookings)
  });

  it('should be a function', () => {
    expect(HotelManagement).to.be.a('function');
  });

  it('should be an instance of user', () => {
    expect(hotel).to.be.an.instanceof(HotelManagement);
  });
});
