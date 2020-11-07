class Room {
  constructor(room) {
    this.number = room.number,
    this.roomType = room.roomType,
    this.bidet = room.hasBidet || false,
    this.bedSize = room.bedSize,
    this.numBeds = room.numBeds,
    this.costPerNight = room.costPerNight
  }
}

export default Room;
