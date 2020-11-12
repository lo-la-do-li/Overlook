import { expect } from 'chai';

import Room from '../src/Room';
import Booking from '../src/Booking';

describe('Room', () => {
  let room1, room2, room3, rooms, booking1;

  beforeEach(() => {
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
  });

    it('should be a function', () => {
      expect(Room).to.be.a('function');
    });

    it('should be an instance of Room', () => {
      expect(room1).to.be.an.instanceof(Room);
    });

      it('should have a number', () => {
        expect(room2.number).to.be.a('number');
        expect(room2.number).to.equal(2);
      });

      it('should have a roomType', () => {
        expect(room3.roomType).to.be.a('string');
        expect(room3.roomType).to.equal('suite');
      });

      it('should have a bidet property that is set to false by default', () => {
        expect(room2.bidet).to.be.a('boolean');
        expect(room2.bidet).to.equal(false);
      });

      it('should have a bed size', () => {
        expect(room1.bedSize).to.be.a('string');
        expect(room1.bedSize).to.equal('queen');
      });

      it('should have number of beds', () => {
        expect(room3.numBeds).to.be.a('number');
        expect(room3.numBeds).to.equal(1);
      });

      it('should have a cost per night', () => {
        expect(room1.costPerNight).to.be.a('number');
        expect(room1.costPerNight).to.equal(345.72);
      });

      // it('should calculate the total cost of several nights', () => {
      //   const numOfNights = 4;
      //
      //   expect(room.getPricePerMultipleNights(numOfNights)).to.equal('1433.60');
      // });
      //
      // it('should return main room information ', () => {
      //   expect(room.getMainRoomInformation()).to.deep.equal({
      //     'Room number': 1,
      //     'Room type': 'residential suite',
      //     'Price': 358.4
      //   });
      // });
    });
