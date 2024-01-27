'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
  .get(function (req, res) {
    const input = req.query.input || '';

    if (!input) {
      return res.send(convertHandler.strInvalidNumberAndUnit);
    }

    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);

    if (initNum === convertHandler.strInvalidNumber
      && initUnit === convertHandler.strInvalidUnit
    ) {
      return res.send(convertHandler.strInvalidNumberAndUnit);
    }

    if (initNum === convertHandler.strInvalidNumber) {
      return res.send(convertHandler.strInvalidNumber);
    }

    if (initUnit === convertHandler.strInvalidUnit) {
      return res.send(convertHandler.strInvalidUnit);
    }

    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);

    res.json({
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
    });
  });
};
