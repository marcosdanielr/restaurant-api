import { Weekday } from "../types/weekday";

export type OpeningHours = {
  restaurant_id: string;
  weekday: Weekday;
  start_time: string;
  end_time: string;
}