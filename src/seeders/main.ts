import initializeDatabase from "../modules/db";
import { Testlog } from "../entity/Testlog";

initializeDatabase().then(async (conn) => {
  await Testlog.clear();
  await Testlog.create({
    nik: "3171234567890123",
    status: "negative",
    testDate: Date.UTC(2020, 12, 1, 12, 0, 0, 0),
  }).save();

  await Testlog.create({
    nik: "3171234567890123",
    status: "positive",
    testDate: Date.UTC(2020, 12, 14, 12, 0, 0, 0),
  }).save();

  await Testlog.create({
    nik: "3506042602660001",
    status: "positive",
    testDate: Date.UTC(2020, 12, 21, 12, 0, 0, 0),
  }).save();
});
