import { OpeningHours, Weekday } from "@/types/repositories/opening-hours-repository";

export interface OpeningHoursRepository {
  create(body: OpeningHours): Promise<void>;
  list(restaurant_id: string): Promise<OpeningHours[]>
  getByWeekday(restaurant_id: string, weekday: Weekday): Promise<OpeningHours | null>
}
