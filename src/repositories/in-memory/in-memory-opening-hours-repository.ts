import { OpeningHours } from "@/models/opening-hours-model";
import { OpeningHoursRepository } from "../opening-hours-repository";
import { Weekday } from "@/types/weekday";


export class InMemoryOpeningHoursRepository implements OpeningHoursRepository {
  public openingHours: OpeningHours[] = []; 

  async create(body: OpeningHours) {
    const { restaurant_id, weekday, start_time, end_time } = body;

    const openingHour = {
      restaurant_id, 
      weekday, 
      start_time, 
      end_time
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
