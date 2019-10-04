class Payment {
  constructor(amount) {
    // How to create abstract class in JavaScript: https://ilikekillnerds.com/2015/06/abstract-classes-in-javascript/
    this.amount = amount;
  }
  getAmount() {
    throw new Error("Override Needed");
  }
}

class CreditPayment extends Payment {
  constructor(amount) {
    this.amount = amount;
  }
  getAmount() {
    return this.amount;
  }
}

class CashPayment extends Payment {
  constructor(amount) {
    this.amount = amount;
  }
  getAmount() {
    return this.amount;
  }
}

module.exports = { CashPayment, CreditPayment };
