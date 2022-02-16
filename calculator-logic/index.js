require("dotenv").config();
const debugg = require("debug")("calculator-app:root");
const http = require("http");
const askUserNumbers = require("./askUserNumbers");
const parseToNumber = require("./parseToNumbers");

const [userNumberOne, userNumberTwo] = require("./getInputByModifiers");

const nums = parseToNumber(userNumberOne, userNumberTwo);
askUserNumbers(...nums);

const port = process.env.MY_PORT;

const myServer = http.createServer();

myServer.listen(port, () => {
  debugg(`server is up in http://localhost:${port}`);
});

myServer.on("request", (request, response) => {
  debugg(`Resquest arrived at ${request.url} with method ${request.method}`);
  response.write("<h1>the magician of programming<h1>");
});
