require("dotenv").config();
const debugg = require("debug")("calculator-app:root");
const http = require("http");
const serverPort = require("./getInputByModifiers");
const operateNumbers = require("./operateNumbers");
const parseToNumber = require("./parseToNumbers");

const userPort = serverPort;

debugg(userPort);

const port = userPort || process.env.MY_PORT;

const myServer = http.createServer();

myServer.listen(port, () => {
  debugg(`server is up in http://localhost:${port}`);
});

myServer.on("request", (request, response) => {
  debugg(`Resquest arrived at ${request.url} with method ${request.method}`);
  const queryNumber1 = request.url.match(/([^?]*)\?a=(\d*)/) ?? NaN;
  // eslint-disable-next-line no-useless-escape
  const queryNumber2 = request.url.match(/([^?]*)\&b=(\d*)/) ?? NaN;
  const numbers = parseToNumber(queryNumber1[2], queryNumber2[2]);
  if (request.url.split("?")[0] === "/calculator") {
    response.statusCode = 200;
  } else {
    response.statusCode = 404;
  }

  if (Number.isNaN(numbers[0]) || Number.isNaN(numbers[1])) {
    response.write(`<h1>Are you sure this is the right place?</h1>`);
    // process.exit();
  } else {
    const [sum, rest, multiplication, division] = operateNumbers(...numbers);
    response.write(`<!DOCTYPE html>
    <html>
    <head>
    <style>
    body {background-color: white;}
    h1 {color: black;
    font-family: 'Bebas Neue', sans-serif; }



 
.button-49,
.button-49:after {
  width: 300px;
  height: 76px;
  line-height: 78px;
  font-size: 14px;
  font-family: 'Bebas Neue', sans-serif;
  background: linear-gradient(45deg, transparent 5%, #FF013C 5%);
  border: 0;
  color: #fff;
  letter-spacing: 3px;
  box-shadow: 6px 0px 0px #00E6F6;
  outline: transparent;
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-49:after {
  --slice-0: inset(50% 50% 50% 50%);
  --slice-1: inset(80% -6px 0 0);
  --slice-2: inset(50% -6px 30% 0);
  --slice-3: inset(10% -6px 85% 0);
  --slice-4: inset(40% -6px 43% 0);
  --slice-5: inset(80% -6px 5% 0);
  
  content: 'ALTERNATE TEXT';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 3%, #00E6F6 3%, #00E6F6 5%, #FF013C 5%);
  text-shadow: -3px -3px 0px #F8F005, 3px 3px 0px #00E6F6;
  clip-path: var(--slice-0);
}

.button-49:hover:after {
  animation: 1s glitch;
  animation-timing-function: steps(2, end);
}

@keyframes glitch {
  0% {
    clip-path: var(--slice-1);
    transform: translate(-20px, -10px);
  }
  10% {
    clip-path: var(--slice-3);
    transform: translate(10px, 10px);
  }
  20% {
    clip-path: var(--slice-1);
    transform: translate(-10px, 10px);
  }
  30% {
    clip-path: var(--slice-3);
    transform: translate(0px, 5px);
  }
  40% {
    clip-path: var(--slice-2);
    transform: translate(-5px, 0px);
  }
  50% {
    clip-path: var(--slice-3);
    transform: translate(5px, 0px);
  }
  60% {
    clip-path: var(--slice-4);
    transform: translate(5px, 10px);
  }
  70% {
    clip-path: var(--slice-2);
    transform: translate(-10px, 10px);
  }
  80% {
    clip-path: var(--slice-5);
    transform: translate(20px, -10px);
  }
  90% {
    clip-path: var(--slice-1);
    transform: translate(-10px, 0px);
  }
  100% {
    clip-path: var(--slice-1);
    transform: translate(0);
  }
}

@media (min-width: 768px) {
  .button-49,
  .button-49:after {
    width: 200px;
    height: 86px;
    line-height: 88px;
  }
}
    </style>
    </head>
    <body>

    <div><h1>My amazing calculator</h1>
      <h2 class="button-49" >The sum is ${sum}</h2>
      <h2 class="button-49" >The rest is ${rest}</h2>
      <h2 class="button-49" >The mult is ${multiplication}</h2>
      <h2 class="button-49" >The division is ${division}</h2>
      </div>

    </body>
    </html>
    `);
    response.end();
  }
});
