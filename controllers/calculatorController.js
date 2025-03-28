// controllers/calculatorController.js
const Calculator = require('../models/calculatorModel');
const logger = require('../services/loggerService');

const calculate = (operation) => {
  return (req, res) => {
    try {
      const num1 = parseFloat(req.query.num1);
      const num2 = parseFloat(req.query.num2);

      // Validate inputs
      Calculator.validateInputs(num1, num2);

      let result;
      switch (operation) {
        case 'add':
          result = Calculator.add(num1, num2);
          break;
        case 'subtract':
          result = Calculator.subtract(num1, num2);
          break;
        case 'multiply':
          result = Calculator.multiply(num1, num2);
          break;
        case 'divide':
          result = Calculator.divide(num1, num2);
          break;
        default:
          throw new Error('Invalid operation');
      }

      logger.info(`New ${operation} operation requested: ${num1} ${operation} ${num2} = ${result}`);
      
      // View (API response)
      res.json({
        operation,
        num1,
        num2,
        result
      });
    } catch (error) {
      logger.error(`Error in ${operation}: ${error.message}`);
      
      // View (Error response)
      res.status(400).json({
        error: error.message
      });
    }
  };
};

module.exports = {
  calculate
};