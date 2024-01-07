import { Weekday } from "../weekday";

export type OpeningHours = {
  restaurant_id: string;
  weekday: Weekday;
  start_time: string;
  end_time: string;
}
