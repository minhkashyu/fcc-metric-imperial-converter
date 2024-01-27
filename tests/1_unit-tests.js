const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  test('`convertHandler` should correctly read a whole number input.',
    function() {
      assert.equal(convertHandler.getNum('1gal'), 1);
      assert.equal(convertHandler.getNum('2L'), 2);
      assert.equal(convertHandler.getNum('3mi'), 3);
      assert.equal(convertHandler.getNum('4km'), 4);
      assert.equal(convertHandler.getNum('5lbs'), 5);
      assert.equal(convertHandler.getNum('6kg'), 6);
    });

  test('`convertHandler` should correctly read a decimal number input.',
    function() {
      assert.equal(convertHandler.getNum('1.5gal'), 1.5);
      assert.equal(convertHandler.getNum('2.5L'), 2.5);
      assert.equal(convertHandler.getNum('3.5mi'), 3.5);
      assert.equal(convertHandler.getNum('4.5km'), 4.5);
      assert.equal(convertHandler.getNum('5.5lbs'), 5.5);
      assert.equal(convertHandler.getNum('6.5kg'), 6.5);
    });

  test('`convertHandler` should correctly read a fractional input.',
    function() {
      assert.equal(convertHandler.getNum('1/2gal'), 0.5);
      assert.equal(convertHandler.getNum('1/2L'), 0.5);
      assert.equal(convertHandler.getNum('1/2mi'), 0.5);
      assert.equal(convertHandler.getNum('1/2km'), 0.5);
      assert.equal(convertHandler.getNum('1/2lbs'), 0.5);
      assert.equal(convertHandler.getNum('1/2kg'), 0.5);
    });

  test(
    '`convertHandler` should correctly read a fractional input with a decimal.',
    function() {
      assert.equal(convertHandler.getNum('1.5/2gal'), 0.75);
      assert.equal(convertHandler.getNum('1.5/2L'), 0.75);
      assert.equal(convertHandler.getNum('1.5/2mi'), 0.75);
      assert.equal(convertHandler.getNum('1.5/2km'), 0.75);
      assert.equal(convertHandler.getNum('1.5/2lbs'), 0.75);
      assert.equal(convertHandler.getNum('1.5/2kg'), 0.75);
    });

  test(
    '`convertHandler` should correctly return an error on a double-fraction (i.e. `3/2/3`).',
    function() {
      assert.equal(convertHandler.getNum('3/2/3gal'), 'invalid number');
      assert.equal(convertHandler.getNum('3/2/3L'), 'invalid number');
      assert.equal(convertHandler.getNum('3/2/3mi'), 'invalid number');
      assert.equal(convertHandler.getNum('3/2/3km'), 'invalid number');
      assert.equal(convertHandler.getNum('3/2/3lbs'), 'invalid number');
      assert.equal(convertHandler.getNum('3/2/3kg'), 'invalid number');
    });

  test(
    '`convertHandler` should correctly default to a numerical input of `1` when no numerical input is provided.',
    function() {
      assert.equal(convertHandler.getNum('gal'), 1);
      assert.equal(convertHandler.getNum('L'), 1);
      assert.equal(convertHandler.getNum('mi'), 1);
      assert.equal(convertHandler.getNum('km'), 1);
      assert.equal(convertHandler.getNum('lbs'), 1);
      assert.equal(convertHandler.getNum('kg'), 1);
    });

  test('`convertHandler` should correctly read each valid input unit.',
    function() {
      assert.equal(convertHandler.getUnit('1GAL'), 'gal');
      assert.equal(convertHandler.getUnit('1gal'), 'gal');
      assert.equal(convertHandler.getUnit('2L'), 'L');
      assert.equal(convertHandler.getUnit('2l'), 'L');
      assert.equal(convertHandler.getUnit('3MI'), 'mi');
      assert.equal(convertHandler.getUnit('3mi'), 'mi');
      assert.equal(convertHandler.getUnit('4KM'), 'km');
      assert.equal(convertHandler.getUnit('4km'), 'km');
      assert.equal(convertHandler.getUnit('5LBS'), 'lbs');
      assert.equal(convertHandler.getUnit('5lbs'), 'lbs');
      assert.equal(convertHandler.getUnit('6KG'), 'kg');
      assert.equal(convertHandler.getUnit('6kg'), 'kg');
    });

  test(
    '`convertHandler` should correctly return an error for an invalid input unit.',
    function() {
      assert.equal(convertHandler.getUnit('1gallons'), 'invalid unit');
      assert.equal(convertHandler.getUnit('2liters'), 'invalid unit');
      assert.equal(convertHandler.getUnit('3miles'), 'invalid unit');
      assert.equal(convertHandler.getUnit('4kilometers'), 'invalid unit');
      assert.equal(convertHandler.getUnit('5pounds'), 'invalid unit');
      assert.equal(convertHandler.getUnit('6kilograms'), 'invalid unit');
    });

  test(
    '`convertHandler` should return the spelled-out string unit for each valid input unit.',
    function() {
      assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
      assert.equal(convertHandler.spellOutUnit('L'), 'liters');
      assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
      assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
      assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
      assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
    });

  test(
    '`convertHandler` should return the correct return unit for each valid input unit.',
    function() {
      assert.equal(convertHandler.getReturnUnit('gal'), 'L');
      assert.equal(convertHandler.getReturnUnit('L'), 'gal');
      assert.equal(convertHandler.getReturnUnit('mi'), 'km');
      assert.equal(convertHandler.getReturnUnit('km'), 'mi');
      assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
      assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
    });

  test('`convertHandler` should correctly convert `gal` to `L`.', function() {
    assert.equal(convertHandler.convert(1, 'gal'), 3.78541);
    assert.equal(convertHandler.convert(2, 'gal'), 7.57082);
  });

  test('`convertHandler` should correctly convert `L` to `gal`.', function() {
    assert.equal(convertHandler.convert(1, 'L'), 0.26417);
    assert.equal(convertHandler.convert(2, 'L'), 0.52834);
  });

  test('`convertHandler` should correctly convert `mi` to `km`.', function() {
    assert.equal(convertHandler.convert(1, 'mi'), 1.60934);
    assert.equal(convertHandler.convert(2, 'mi'), 3.21868);
  });

  test('`convertHandler` should correctly convert `km` to `mi`.', function() {
    assert.equal(convertHandler.convert(1, 'km'), 0.62137);
    assert.equal(convertHandler.convert(2, 'km'), 1.24275);
  });

  test('`convertHandler` should correctly convert `lbs` to `kg`.', function() {
    assert.equal(convertHandler.convert(1, 'lbs'), 0.45359);
    assert.equal(convertHandler.convert(2, 'lbs'), 0.90718);
  });

  test('`convertHandler` should correctly convert `kg` to `lbs`.', function() {
    assert.equal(convertHandler.convert(1, 'kg'), 2.20462);
    assert.equal(convertHandler.convert(2, 'kg'), 4.40925);
  });
});
