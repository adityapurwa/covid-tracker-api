import * as tap from "tap";
import initializeFastify from "./fastify";
import initializeDatabase from "./db";
import { Scan } from "../entity/Scan";
import { Testlog } from "../entity/Testlog";

const test = async () => {
  const db = await initializeDatabase();
  const fastify = initializeFastify(db, { logger: false });

  tap.tearDown(() => {
    fastify.close();
    db.close();
  });

  tap.test("POST `/scan` route", async (t) => {
    t.plan(5);
    t.test("it should fail when the body is empty", async (st) => {
      const res = await fastify.inject({
        method: "POST",
        url: "/scan",
      });
      st.strictEqual(res.statusCode, 400);
    });
    t.test("it should fail when the body is invalid", async (st) => {
      const res = await fastify.inject({
        method: "POST",
        url: "/scan",
        payload: {
          nik: "",
          name: "",
          birthday: "",
        },
      });
      st.strictEqual(res.statusCode, 400);
    });
    t.test("it should fail when the birthday is invalid", async (st) => {
      const res = await fastify.inject({
        method: "POST",
        url: "/scan",
        payload: {
          nik: "123",
          name: "123",
          birthday: "123xyz",
        },
      });
      st.strictEqual(res.statusCode, 400);
    });
    t.test("it should succeed when everything is valid", async (st) => {
      const res = await fastify.inject({
        method: "POST",
        url: "/scan",
        payload: {
          nik: "123",
          name: "John",
          birthday: new Date().toISOString(),
          birthplace: "Town",
          address1: "Street",
          address2: "Street",
          city: "New York",
          province: "New York",
        },
      });
      st.strictEqual(res.statusCode, 200);
    });

    t.test("it should return associated test logs", async (st) => {
      await Testlog.create({
        nik: "123",
        status: "positive",
        testDate: new Date(),
      }).save();
      const res = await fastify.inject({
        method: "POST",
        url: "/scan",
        payload: {
          nik: "123",
          name: "John",
          birthday: new Date().toISOString(),
          birthplace: "Town",
          address1: "Street",
          address2: "Street",
          city: "New York",
          province: "New York",
        },
      });
      st.strictEqual(res.statusCode, 200);
      st.strictEqual(res.json<{ logs: Testlog[] }>().logs.length, 1);
    });
  });
};
test();
