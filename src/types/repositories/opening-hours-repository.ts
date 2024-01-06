export type Weekday = "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday";

export type OpeningHours = {
  restaurant_id: string;
  weekday: Weekday;
  start_hour: Date;
  final_hour: Date;
}
