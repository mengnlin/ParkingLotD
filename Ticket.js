let i = 1;
class Ticket {
  constructor(sectionName) {
    this.sectionName = sectionName;
    this.id = i++;
    this.enter = new Date();
    this.exit = null;
    this.balanceDue = 0;
  }
}

module.exports = Ticket;
