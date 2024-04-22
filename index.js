require("dotenv").config();

const Server = require("./src/service");

const server = new Server();

server.listen();
