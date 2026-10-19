function ConvertHandler() {

  this.getNum = function(input) {
    if (input === undefined || input === null) return undefined;
    const str = String(input).trim();
    const firstCharIdx = str.search(/[a-zA-Z]/);
    const numStr = firstCharIdx === -1 ? str : str.slice(0, firstCharIdx).trim();

    if (numStr === '') {
      return 1;
    }

    if (numStr.includes('/')) {
      const parts = numStr.split('/');
      if (parts.length !== 2) {
        return undefined;
      }
      const [numerator, denominator] = parts;
      if (!/^\d+(\.\d+)?$/.test(numerator.trim()) || !/^\d+(\.\d+)?$/.test(denominator.trim())) {
        return undefined;
      }
      const den = parseFloat(denominator);
      if (den === 0) return undefined;
      return parseFloat(numerator) / den;
    }

    if (!/^\d+(\.\d+)?$/.test(numStr)) {
      return undefined;
    }

    return parseFloat(numStr);
  };

  this.getUnit = function(input) {
    if (input === undefined || input === null) return undefined;
    const str = String(input).trim();
    const firstCharIdx = str.search(/[a-zA-Z]/);
    if (firstCharIdx === -1) {
      return undefined;
    }
    const unitStr = str.slice(firstCharIdx).trim().toLowerCase();
    const validUnits = {
      gal: 'gal',
      l: 'L',
      mi: 'mi',
      km: 'km',
      lbs: 'lbs',
      kg: 'kg'
    };
    return validUnits[unitStr] || undefined;
  };

  this.getReturnUnit = function(initUnit) {
    if (!initUnit) return undefined;
    switch (initUnit.toLowerCase()) {
      case 'gal': return 'L';
      case 'l': return 'gal';
      case 'mi': return 'km';
      case 'km': return 'mi';
      case 'lbs': return 'kg';
      case 'kg': return 'lbs';
      default: return undefined;
    }
  };

  this.spellOutUnit = function(unit) {
    if (!unit) return undefined;
    const unitNames = {
      gal: 'gallons',
      l: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };
    return unitNames[unit.toLowerCase()] || undefined;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    if (initNum === undefined || !initUnit) return undefined;

    switch (initUnit.toLowerCase()) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        return undefined;
    }

    return parseFloat(result.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };

}

module.exports = ConvertHandler;
