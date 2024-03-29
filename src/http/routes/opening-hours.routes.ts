import { FastifyInstance } from "fastify";
import { createOpeningHour } from "../controllers/opening-hours/create-opening-hour";
import { listOpeningHours } from "../controllers/opening-hours/list-opening-hours";

export async function openingHoursRoutes(app: FastifyInstance) {

  app.post("/opening-hours", {
    schema: {
      tags: ["Opening Hours"],
      body: {
        type: "object",
        properties: {
          restaurant_id: { type: "string" },
          weekday: { type: "string" },
          start_time: { type: "string" },
          end_time: { type: "string" }
        }
      }
    }
  }, createOpeningHour);

  app.get("/opening-hours/:restaurant_id", {
    schema: {
      tags: ["Opening Hours"],
    }
  }, listOpeningHours);

}
