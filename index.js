require("dotenv").config();
const chalk = require("chalk");
const debugg = require("debug")("calculator-app:root");
const { program } = require("commander");

const operateNumbers = require("./operateNumbers");

program.option("-n1, --userNumberOne <number>");
program.option("-n2, --userNumberTwo <number>");

program.parse();

let { userNumberOne, userNumberTwo } = program.opts();

userNumberOne = parseFloat(userNumberOne, 10);
userNumberTwo = parseFloat(userNumberTwo, 10);

const validateUserInputPrompt = (numberOne, numberTwo) => {
  if (Number.isNaN(numberOne) || Number.isNaN(numberTwo)) {
    validateUserInputPrompt(numberOne, numberTwo);
  } else {
    debugg(chalk.green(operateNumbers(numberOne, numberTwo)));
  }
};

const validateUserInput = (numberOne, numberTwo) => {
  if (Number.isNaN(numberOne) || Number.isNaN(numberTwo)) {
    validateUserInputPrompt(numberOne, numberTwo);
  } else {
    debugg(chalk.green(operateNumbers(numberOne, numberTwo)));
  }
};

validateUserInput(userNumberOne, userNumberTwo);
