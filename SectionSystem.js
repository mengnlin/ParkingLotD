// const Rate = require("./Rate");
class SectionSystem {
  constructor(name, rate) {
    this.name = name;
    this.rate = rate;
    // The reason is: Does Rate belongs to SectionSystem or is it an separatable entity?
    // The admin can specify the rate, that means admin should also have access to Rate.
    // while for SectionSystem, does it need to know the unitPrice and unitMinute other than calculating the price(which is
    // already handled inside Rate)?
    this.handicappedTicketandDriver = new Map();
    this.normalTicketandDriver = new Map();
    this.handicappedCapacity = 1;
    this.normalCapacity = 1;
  }
  calculateRate(ticketId) {
    let ticket = this.searchTicket(ticketId);
    return this.rate.calculateRate(ticket.enter, ticket.exit);
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
    // deleteTicket has side effect, it deletes the ticket from system. It's not a good practice to
    // use function with side effect in boolean expression. The reason is https://eslint.org/docs/rules/no-unused-expressions

    // The better way is
    const deleted = this._deleteTicket(
      ticketId,
      this.handicappedTicketandDriver
    );
    if (!deleted) {
      this._deleteTicket(ticketId, this.normalTicketandDriver);
    }
  }
  // .isHandicapped;
}

module.exports = SectionSystem;
