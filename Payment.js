class Payment {
  constructor(amount, paymentType) {
    // I can literally pass anything as paymentType, like 'bitcoin', 'rice'... but does your system support it?
    // and what would happen if it doesn't
    // In order to restrict the paymentType user can pass in. One way is to use enum in Java. enum can only be a set of possible values
    // Javascript doesn't haven enum, but you can just manually check the value of paymentType
    // if (paymentType === 'cash' || paymentType === 'credit') {...}
    
    // Another better solution is to make Payment an abstract class and extend it with CashPayment and CreditPayment.
    // How to create abstract class in JavaScript: https://ilikekillnerds.com/2015/06/abstract-classes-in-javascript/
    this.amount = amount;
    this.paymentType = paymentType;
  }
}

module.exports = Payment;
