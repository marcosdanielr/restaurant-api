export type Weekday = "SUNDAY" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY";

export type OpeningHours = {
  restaurant_id: string;
  weekday: Weekday;
  start_hour: string;
  final_hour: string;
}
