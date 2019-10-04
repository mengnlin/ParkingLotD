class Rate {
  constructor(unitPrice) {
    this.unitPrice = unitPrice;
  }

  calculateRate(startTime, endTime) {
    throw new Error("calculateRate method needed");
  }
}
class DailyRate extends Rate {
  constructor(unitPrice) {
    super(unitPrice);
  }
  calculateRate(startTime, endTime) {
    let units = 1;
    return (this.unitPrice * units).toFixed(2);
  }
}

class HourlyRate extends Rate {
  constructor(unitPrice) {
    super(unitPrice);
  }
  calculateRate(startTime, endTime) {
    let units = 1;
    return (this.unitPrice * units).toFixed(2);
  }
}

class PremiumRate extends Rate {
  constructor(unitPrice) {
    super(unitPrice);
  }
  calculateRate(startTime, endTime) {
    let units = 1;
    return (this.unitPrice * units).toFixed(2);
  }
}
module.exports = { DailyRate, HourlyRate, PremiumRate };
