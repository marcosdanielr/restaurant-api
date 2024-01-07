import { OpeningHours } from "@/types/repositories/opening-hours-repository";
import { Weekday } from "@/types/weekday";

export interface OpeningHoursRepository {
  create(body: OpeningHours): Promise<void>;
  list(restaurant_id: string): Promise<OpeningHours[]>
  getByWeekday(restaurant_id: string, weekday: Weekday): Promise<OpeningHours | null>
}
