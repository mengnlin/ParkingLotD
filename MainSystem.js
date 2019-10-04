const SectionSystem = require("./SectionSystem");
const Ticket = require("./Ticket");
const Driver = require("./Driver");
const { DailyRate, PremiumRate, HourlyRate } = require("./Rate");
class MainSystem {
  constructor(location) {
    this.location = location;
    this.sections = new Map();
    const dailyRate = new DailyRate(30);
    const premiumRate = new PremiumRate(10);
    const hourlyRate = new HourlyRate(5);
    this.addSection("Daily", dailyRate);
    this.addSection("Hourly", hourlyRate);
    this.addSection("Premium", premiumRate);
  }
  // triger when user click
  displaySections() {
    Array.from(this.sections.values()).forEach(section => {
      console.log(section.name);
    });
  }
  addSection(name, rate) {
    this.sections.set(name, new SectionSystem(name, rate));
  }
  removeSection(name) {
    this.sections.delete(name);
  }
  _getSection(sectionName) {
    return this.sections.get(sectionName);
  }

  selectSection(sectionName, isHandicapped, liscenceNumber) {
    if (this.getRestCount(sectionName, isHandicapped) > 0) {
      let newTicket = this.outputTicket(sectionName);
      let newDriver = new Driver(liscenceNumber, sectionName, newTicket.id);
      this.sections
        .get(sectionName)
        .saveInSystem(newTicket, newDriver, isHandicapped);
      console.log(newTicket);
    } else {
      console.log("Selection currently unavailable");
    }
  }
  outputTicket(sectionName) {
    let newTicket = new Ticket(sectionName);
    return newTicket;
  }

  getRestCount(sectionName, isHandicapped) {
    let selectedSection = this._getSection(sectionName);
    if (isHandicapped) {
      return selectedSection.getRestCount().handicapped;
    } else {
      return selectedSection.getRestCount().normal;
    }
  }
  startExitProcess(ticketId, sectionName) {
    let currentSection = this._getSection(sectionName);
    currentSection.printExitDate(ticketId);
    this.askPayment(ticketId, currentSection.name);
  }
  askPayment(ticketId, sectionName) {
    let currentSection = this._getSection(sectionName);
    let amount = currentSection.calculateRate(ticketId);
    ticket.balanceDue = amount;
    console.log("Your Amount Due is ", ticket.balanceDue);
  }
  takePayment(payment, sectionName, ticketId) {
    // a bonus question: how can we not ask user for ticketId again and again?
    // user already gave us ticketId in askPayment, how do we reuse that?
    // Think about http and browswer, why don't we need to enter user name and password
    // every time we navigate to a different amazon page?
    // hint: session
    let paymentAmount = payment.getAmount();
    let currentSection = this._getSection(sectionName);
    let ticket = currentSection.searchTicket(ticketId);
    let rate = ticket.balanceDue;
    if (paymentAmount === rate) {
      console.log("payment Processed");
      this.exitLot(ticketId, sectionName);
    } else if (paymentAmount > rate) {
      console.log("Please take your change of ", paymentAmount - rate);
      this.exitLot(ticketId, sectionName);
    } else {
      console.log("Remaining Balance ", paymentAmount - rate);
    }
  }
  exitLot(ticketId, sectionName) {
    let currentSection = this._getSection(sectionName);
    currentSection.exitLot(ticketId);
  }
}

module.exports = MainSystem;
