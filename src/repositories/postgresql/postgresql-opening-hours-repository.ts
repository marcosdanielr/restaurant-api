import { app } from "@/app";
import { IOpeningHoursRepository } from "../opening-hours-repository";
import { Weekday } from "@/types/weekday";
import { CreateOpeningHoursRequest } from "@/models/opening-hours-model";

export class PostgreSQLOpeningHoursRepository implements IOpeningHoursRepository {

  async create(body: CreateOpeningHoursRequest) {
    const { restaurant_id, weekday, start_time, end_time } = body;

    await app.pg.query(
      "INSERT INTO opening_hours (restaurant_id, weekday, start_time, end_time) VALUES ($1, $2) RETURNING *",
      [restaurant_id, weekday, start_time, end_time]
    );

  }

  async list(restaurant_id_req: string) {
    return []; 
  }

  async getByWeekday(restaurant_id_req: string, weekday: Weekday) {
    return null;
  }

}
