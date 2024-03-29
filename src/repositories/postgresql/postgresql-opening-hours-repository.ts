import { app } from "@/app";
import { IOpeningHoursRepository } from "../opening-hours-repository";
import { Weekday } from "@/types/weekday";
import { CreateOpeningHoursRequest } from "@/models/opening-hours-model";

export class PostgreSQLOpeningHoursRepository implements IOpeningHoursRepository {

  async create(body: CreateOpeningHoursRequest) {
    const { restaurant_id, weekday, start_time, end_time } = body;

    await app.pg.query(
      "INSERT INTO opening_hours (restaurant_id, weekday, start_time, end_time) VALUES ($1, $2, $3, $4) RETURNING *",
      [restaurant_id, weekday, start_time, end_time]
    );

  }

  async list(restaurant_id_req: string) {
    const restaurant_id = restaurant_id_req;
  
    const { rows: opening_hours } = await app.pg.query(
      "SELECT * FROM opening_hours WHERE restaurant_id = $1",
      [restaurant_id]
    );

    return opening_hours;
  }

  async getByWeekday(restaurant_id_req: string, weekday_req: Weekday) {
    const restaurant_id = restaurant_id_req;
    const weekday = weekday_req;
  
    const { rows } = await app.pg.query(
      "SELECT * FROM opening_hours WHERE restaurant_id = $1 AND weekday = $2 LIMIT 1",
      [restaurant_id, weekday]
    );

    const [ opening_hour ] = rows;

    return opening_hour || null;
  }
}
