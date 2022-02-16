const prompt = require("prompt");

prompt.start();

const askNumbersPrompt = async (operate) => {
  const [num1, num2] = await prompt.get(["numberOne", "numberTwo"]);
  operate(num1, num2);
};

module.exports = askNumbersPrompt;
