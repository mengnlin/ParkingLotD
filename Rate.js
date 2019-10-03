class Rate {
  constructor(unitPrice, unitMinutes) {
    this.unitPrice = unitPrice;
    this.unitMinutes = unitMinutes;
  }
  _getUnit(startTime, endTime) {
    return (endTime - startTime) / this.unitMinutes;
  }
  calculateRate(startTime, endTime) {
    let units = this._getUnit(startTime, endTime);
    return (this.unitPrice * units).toFixed(2);
  }
}
module.exports = Rate;
