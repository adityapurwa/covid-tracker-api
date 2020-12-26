import { FastifyInstance } from "fastify";
import { Scan } from "../entity/Scan";
import { Connection } from "typeorm";
import { Testlog } from "../entity/Testlog";

interface CreateScanRequest {
  nik: string;
  name: string;
  birthday: string;
  birthplace: string;
  address1: string;
  address2: string;
  city: string;
  province: string;
}

export default function initializeScanModule(
  app: FastifyInstance,
  connection: Connection
) {
  app.post<{
    Body: CreateScanRequest;
  }>(
    "/scan",
    {
      schema: {
        body: {
          type: "object",
          requiredKeys: [
            "nik",
            "name",
            "birthday",
            "birthplace",
            "address1",
            "address2",
            "city",
            "province",
          ],
          properties: {
            nik: { type: "string" },
            name: { type: "string" },
            birthday: { type: "string" },
            birthplace: { type: "string" },
            address1: { type: "string" },
            address2: { type: "string" },
            city: { type: "string" },
            province: { type: "string" },
          },
        },
      },
    },
    async (request, reply) => {
      const data = request.body;
      const birthdayAsNumber = Date.parse(data.birthday);
      if (isNaN(birthdayAsNumber)) {
        reply.status(400).send({
          errors: {
            birthday: "Birthday is not a valid date",
          },
        });
        return;
      }
      const scan = new Scan();
      scan.nik = data.nik;
      scan.name = data.name;
      scan.birthday = new Date(birthdayAsNumber);
      scan.birthplace = data.birthplace;
      scan.address1 = data.address1;
      scan.address2 = data.address2;
      scan.province = data.province;
      scan.city = data.city;
      await scan.save();
      const logs = await Testlog.find({ where: { nik: data.nik } });
      reply.send({
        ...scan,
        logs,
      });
    }
  );
}
