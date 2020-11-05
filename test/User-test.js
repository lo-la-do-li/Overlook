import { expect } from 'chai';

import User from '../src/User';

describe('User', () => {
  let customer, room1, room2, room3, room4, room5, rooms, booking1, booking2, booking3, booking4, booking5, bookings;

  beforeEach(() => {
    customer = new User(9, 'Maxie Torp')
    room1 = {
      "number": 1,
      "roomType": "suite",
      "bidet": true,
      "bedSize": "queen",
      "numBeds": 1,
      "costPerNight": 345.72
    }
    room2 = {
      "number": 2,
      "roomType": "suite",
      "bidet": false,
      "bedSize": "king",
      "numBeds": 1,
      "costPerNight": 545.72
    }
    room3 = {
      "number": 3,
      "roomType": "suite",
      "bidet": true,
      "bedSize": "double",
      "numBeds": 1,
      "costPerNight": 145.72
    }
    room4 = {
      "number": 4,
      "roomType": "single room",
      "bidet": false,
      "bedSize": "queen",
      "numBeds": 2,
      "costPerNight": 231.46
    }
    room5 = {
      "number": 5,
      "roomType": "junior suite",
      "bidet": false,
      "bedSize": "king",
      "numBeds": 1,
      "costPerNight": 261.26
    }
    rooms = [room1, room2, room3, room4, room5]

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

    booking3 = {
      "id": "5fwrgu4i7k55hl6t6",
      "userID": 13,
      "date": "2020/02/03",
      "roomNumber": 3,
      "roomServiceCharges": []
    }

    booking4 = {
      "id": "5fwrgu4i7k55hl6t6",
      "userID": 13,
      "date": "2020/02/04",
      "roomNumber": 1,
      "roomServiceCharges": []
    }

    booking5 = {
      "id": "5fwrgu4i7k55hl6t6",
      "userID": 13,
      "date": "2020/02/05",
      "roomNumber": 4,
      "roomServiceCharges": []
    }

    bookings = [booking1, booking2, booking3, booking4, booking5];
  });

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should be an instance of user', () => {
    expect(customer).to.be.an.instanceof(User);
  });

  it('should have an id', () => {
    expect(customer.id).to.equal(9);
  });

  it('should have a name', () => {
    expect(customer.name).to.equal('Maxie Torp');
  });

  it('should have an array of bookings set to empty by default', () => {
    expect(customer.bookings.length).to.equal(0);
  });

  it('should be able to search for available rooms by date', () => {
    expect(customer.findARoom('2020/02/01', bookings, rooms).to.deep.equal([room1, room2]))
  })
});
