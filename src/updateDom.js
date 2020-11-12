const updateDom = {
  displayAvailableRooms: (roomSet, element) => {
    roomSet.forEach(room => {

      const roomCard =
      `
      <div class="w3-container">
      <div class="room-card">
      <div class="available-room-container" id=${room.number}>
      <div class="room-specs">
      <h3>${room.roomType}</h3>
      <div class="navFlex">
      <p><b>Room Number:</b></p>
      <p>${room.number}</p>
      </div>
      <div class="navFlex">
      <p><b>Bedsize:</b></p>
      <p> ${room.bedSize}</p>
      </div>
      <div class="navFlex">
      <p><b>Bed #:</b></p>
      <p> ${room.numBeds}</p>
      </div>
      <div class="navFlex">
      <p><b>Cost:</b></p>
      <p>${" $" + room.costPerNight}</p>
      </div>
      <input type="button" class="book-button" value="Book">
      </div>
      </div>
      </div>
      </div>
      `
      element.insertAdjacentHTML('afterbegin', roomCard);
    })
  }
}
