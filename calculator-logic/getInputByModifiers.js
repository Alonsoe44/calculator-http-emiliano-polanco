const { program } = require("commander");

program.option("-p, --port <number>");
program.parse();
const { port } = program.opts();

module.exports = port;
