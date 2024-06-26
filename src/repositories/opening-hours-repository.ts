import { CreateOpeningHourRequest, OpeningHours } from "@/models/opening-hours-model";
import { Weekday } from "@/types/weekday";

export interface IOpeningHoursRepository {
  create(body: CreateOpeningHourRequest): Promise<void>;
  list(restaurant_id: string): Promise<OpeningHours[]>
  getByWeekday(restaurant_id: string, weekday: Weekday): Promise<OpeningHours | null>
}
