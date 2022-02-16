require("dotenv").config();
const debugg = require("debug")("calculator-app:root");
const http = require("http");
const operateNumbers = require("./operateNumbers");
const parseToNumber = require("./parseToNumbers");

const port = process.env.MY_PORT;

const myServer = http.createServer();

myServer.listen(port, () => {
  debugg(`server is up in http://localhost:${port}`);
});

myServer.on("request", (request, response) => {
  debugg(`Resquest arrived at ${request.url} with method ${request.method}`);
  const queryNumber1 = request.url.match(/([^?]*)\?a=(\d*)/)[2];
  const queryNumber2 = request.url.match(/([^?]*)\&b=(\d*)/)[2];
  const numbers = parseToNumber(queryNumber1, queryNumber2);
  const [sum, rest, multiplication, division] = operateNumbers(...numbers);

  response.write(`<h1>My amazing calculator<h1>
  <h2>The sum is ${sum}<h2>
  <h2>The rest is ${rest}<h2>
  <h2>The multiplication is ${multiplication}<h2>
  <h2>The division is ${division}<h2>`);
});
