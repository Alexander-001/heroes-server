const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.heroes = "/heroes";
    //* Api paths
    this.middlewares();
    this.connectDB();
    this.routes();
  }

  middlewares() {
    this.app.use(cors({ origin: "http://localhost:3000" }));
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  async connectDB() {
    try {
      mongoose.connect(process.env.DB_MONGO, {
        connectTimeoutMS: 5000,
        socketTimeoutMS: 5000,
      });
      console.log("Mongo database connected");
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  routes() {
    //* Api schedules
    this.app.use(this.heroes, require("../routes/heroes.routes"));
    // this.app.use(this.users, require("../routes/users"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Listening on port " + this.port);
    });
  }
}

module.exports = Server;
