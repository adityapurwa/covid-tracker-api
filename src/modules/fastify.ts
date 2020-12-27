import { fastify, FastifyServerOptions } from "fastify";
import initializeScanModule from "./scan";
import { Connection } from "typeorm";

export default function initializeFastify(
  connection: Connection,
  opts: FastifyServerOptions = {}
) {
  const app = fastify(opts);
  app.get("/", (request, reply) => {
    reply.send({
      status: 200,
      version: 1,
    });
  });
  initializeScanModule(app, connection);

  app.listen(
    process.env.NODE_ENV === "test" ? 8001 : 8000,
    "0.0.0.0",
    (err) => {
      console.log(err);
    }
  );

  return app;
}
