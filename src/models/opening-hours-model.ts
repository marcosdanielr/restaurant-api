import { Weekday } from "../types/weekday";

export type OpeningHours = {
  id: string;
  restaurant_id: string;
  weekday: Weekday;
  start_time: string;
  end_time: string;
  created_at: Date;
  updated_at: Date;
}


export type CreateOpeningHourRequest = {
  restaurant_id: string;
  weekday: Weekday;
  start_time: string;
  end_time: string;
}
