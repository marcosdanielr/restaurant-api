import { CreateOpeningHourRequest, OpeningHours } from "@/models/opening-hours-model";
import { IOpeningHoursRepository } from "../opening-hours-repository";
import { Weekday } from "@/types/weekday";
import { randomUUID } from "crypto";


export class InMemoryOpeningHoursRepository implements IOpeningHoursRepository {
  public openingHours: OpeningHours[] = []; 

  async create(body: CreateOpeningHourRequest) {
    const { restaurant_id, weekday, start_time, end_time } = body;

    const openingHour: OpeningHours = {
      id: randomUUID(),
      restaurant_id, 
      weekday, 
      start_time, 
      end_time,
      created_at: new Date(),
      updated_at: new Date()
    };

    this.openingHours.push(openingHour);
  }

  async getByWeekday(restaurant_id: string, weekday: Weekday) {
    const openingHour = this.openingHours.find(item => item.restaurant_id === restaurant_id && item.weekday === weekday) ?? null;

    return openingHour;
  }

  async list(restaurant_id: string) {
    const openingHours = this.openingHours.filter(item => item.restaurant_id === restaurant_id);

    return openingHours;
  }
}
