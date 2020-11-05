class Room {
  constructor(number, roomType, hasBidet, bedSize, numBeds, costPerNight) {
    this.number = number,
    this.roomType = roomType,
    this.bidet = hasBidet || false,
    this.bedSize = bedSize,
    this.numBeds = numBeds,
    this.costPerNight = costPerNight
  }
}

export default Room;
