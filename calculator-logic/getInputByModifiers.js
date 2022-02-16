const { program } = require("commander");

program.option("-n1, --userNumberOne <number>");
program.option("-n2, --userNumberTwo <number>");
program.parse();
const { userNumberOne, userNumberTwo } = program.opts();

module.exports = [userNumberOne, userNumberTwo];
