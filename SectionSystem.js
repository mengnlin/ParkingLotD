const Rate = require("./Rate");
class SectionSystem {
  constructor(name, unitPrice, unitMinute) {
    this.name = name;
    this.rate = new Rate(unitPrice, unitMinute);
    this.handicappedTicketandDriver = new Map();
    this.normalTicketandDriver = new Map();
    this.handicappedCapacity = 1;
    this.normalCapacity = 1;
  }
  searchTicket(ticketId) {
    let ticketAndDriver =
      this.handicappedTicketandDriver.get(ticketId) ||
      this.normalTicketandDriver.get(ticketId);
    return ticketAndDriver[0];
  }
  scanTicket(ticketId) {
    let exist =
      this.handicappedTicketandDriver.has(ticketId) ||
      this.normalTicketandDriver.has(ticketId);
    console.log(exist ? "scan ticket success" : "scan failed");
  }
  saveInSystem(ticket, driver, isHandicapped) {
    if (isHandicapped) {
      this.handicappedTicketandDriver.set(ticket.id, [ticket, driver]);
    } else {
      this.normalTicketandDriver.set(ticket.id, [ticket, driver]);
    }
  }

  getRestCount() {
    let handicappedRestCount =
      this.handicappedCapacity - this.handicappedTicketandDriver.size;
    let normalRestCount = this.normalCapacity - this.normalTicketandDriver.size;
    return { handicapped: handicappedRestCount, normal: normalRestCount };
  }

  _deleteTicket(ticketId, map) {
    if (map.has(ticketId)) {
      map.delete(ticketId);
      console.log("Ticket Processed");
      return true;
    }
  }
  printExitDate(ticketId) {
    let ticket = this.searchTicket(ticketId);
    ticket.exit = new Date();
  }
  exitLot(ticketId) {
    this._deleteTicket(ticketId, this.handicappedTicketandDriver) ||
      this._deleteTicket(ticketId, this.normalTicketandDriver);
  }
  // .isHandicapped;
}

module.exports = SectionSystem;
