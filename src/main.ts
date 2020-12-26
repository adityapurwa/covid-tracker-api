require("dotenv").config();
import "reflect-metadata";

import * as config from "config";
import initializeFastify from "./modules/fastify";
import initializeDatabase from "./modules/db";

console.log(config.get("orm"));

initializeDatabase().then((connection) => {
  initializeFastify(connection);
});
