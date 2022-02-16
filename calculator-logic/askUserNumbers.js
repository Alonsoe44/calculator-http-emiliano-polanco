require("dotenv").config();
const chalk = require("chalk");
const debugg = require("debug")("calculator-app:askUserNumber");
const prompt = require("prompt");
const parseToNumber = require("./parseToNumbers");
const operateNumbers = require("./operateNumbers");

prompt.start();

const askUserNumbers = async (numberOne, numberTwo) => {
  if (Number.isNaN(numberOne) || Number.isNaN(numberTwo)) {
    const { firstNumber, secondNumber } = await prompt.get([
      "firstNumber",
      "secondNumber",
    ]);
    askUserNumbers(...parseToNumber(firstNumber, secondNumber));
  } else {
    debugg(chalk.green(operateNumbers(numberOne, numberTwo)));
  }
};

module.exports = askUserNumbers;
