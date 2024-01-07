import { OpeningHours } from "@/models/opening-hours-model";
import { Weekday } from "@/types/weekday";

export interface OpeningHoursRepository {
  create(body: OpeningHours): Promise<void>;
  list(restaurant_id: string): Promise<OpeningHours[]>
  getByWeekday(restaurant_id: string, weekday: Weekday): Promise<OpeningHours | null>
}
