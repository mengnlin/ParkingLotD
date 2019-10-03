class Rate {
  // Better create subclass that overrides the calculateRate function for hourly, daily and premium.
  // They might have different logic other than the unitMinutes.
  // For example, Daily might get the upper bound of days, so 1.5 days will be charged for 2 days
  // Having subclass allows future modification to the logic for each Rate.
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
