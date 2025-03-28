// models/calculatorModel.js
class Calculator {
    static add(num1, num2) {
      return num1 + num2;
    }
  
    static subtract(num1, num2) {
      return num1 - num2;
    }
  
    static multiply(num1, num2) {
      return num1 * num2;
    }
  
    static divide(num1, num2) {
      if (num2 === 0) {
        throw new Error('Division by zero is not allowed');
      }
      return num1 / num2;
    }
  
    static validateInputs(num1, num2) {
      if (isNaN(num1) || isNaN(num2)) {
        throw new Error('Invalid input parameters. Please provide valid numbers.');
      }
    }
  }
  
  module.exports = Calculator;