function ConvertHandler() {
  this.strInvalidNumber = 'invalid number';
  this.strInvalidUnit = 'invalid unit';
  this.strInvalidNumberAndUnit = 'invalid number and unit';

  this.getNum = function(input) {
    // an optional "-" followed by digits, dots, or slashes
    let matches = input.match(/(-?[\d.\/]+)/);
    let result = matches?.[1];

    if (result === undefined) {
      result = '1';
    }

    // no more than one "/"
    if ((result.match(/\//g) || []).length > 1) {
      return this.strInvalidNumber;
    }

    // no more than one "."
    if ((result.match(/\./g) || []).length > 1) {
      return this.strInvalidNumber;
    }

    const fractionStrToDecimal = function (str) {
      return str.split('/').reduce((p, c) => p / c);
    };

    return fractionStrToDecimal(result);
  };

  this.getUnit = function(input) {
    // all lowercase and uppercase letters
    let matches = input.match(/([a-zA-Z]+)/);
    let result = (matches?.[1] || '').trim().toLowerCase();

    if (result === 'l') {
      return 'L';
    }

    switch (result) {
      case 'gal':
      case 'L':
      case 'mi':
      case 'km':
      case 'lbs':
      case 'kg':
        return result;
      default:
        return this.strInvalidUnit;
    }
  };

  this.getReturnUnit = function(initUnit) {
    switch (initUnit) {
      case 'gal':
        return 'L';
      case 'L':
        return 'gal';
      case 'mi':
        return 'km';
      case 'km':
        return 'mi';
      case 'lbs':
        return 'kg';
      case 'kg':
        return 'lbs';
      default:
        return this.strInvalidUnit;
    }
  };

  this.spellOutUnit = function(unit) {
    switch (unit) {
      case 'gal':
        return 'gallons';
      case 'L':
        return 'liters';
      case 'mi':
        return 'miles';
      case 'km':
        return 'kilometers';
      case 'lbs':
        return 'pounds';
      case 'kg':
        return 'kilograms';
      default:
        return this.strInvalidUnit;
    }
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    switch (initUnit) {
      case 'gal':
        return parseFloat((initNum * galToL).toFixed(5));
      case 'L':
        return parseFloat((initNum / galToL).toFixed(5));
      case 'mi':
        return parseFloat((initNum * miToKm).toFixed(5));
      case 'km':
        return parseFloat((initNum / miToKm).toFixed(5));
      case 'lbs':
        return parseFloat((initNum * lbsToKg).toFixed(5));
      case 'kg':
        return parseFloat((initNum / lbsToKg).toFixed(5));
      default:
        return this.strInvalidUnit;
    }
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    // 3.1 miles converts to 4.98895 kilometers
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
  };
}

module.exports = ConvertHandler;
