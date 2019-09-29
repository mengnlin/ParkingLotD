class ParkingLot {
  constructor(id, location) {
    this._parkingRate = 10;
    this.id = id;
    this.location = location;
  }
  addParkingFloor() {}
  addEntrancePanel() {}
}

// interface Vehicle
//

class Vehicle {
  constructor(liscenceNumber) {
    this.liscenceNumber = liscenceNumber;
  }

  // abstract method
  assignTicket() {
    throw new Error("Not implemented");
  }
}

// implements Vehicle
class Car extends Vehicle {
  //override
  assignTicket() {
    console.log("Assign ticket for Car");
  }
}

module.exports = { ParkingLot, Car, Vehicle };
