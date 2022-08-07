const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();

app.use(cors());

const server = http.createServer(app);
require("./socket")(server);

server.listen(8080, () => {
  console.log(`Socket started at http://localhost:8080/`);
});
