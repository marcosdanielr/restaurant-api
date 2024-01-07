import { Weekday } from "../weekday";

export type Promotion = {
  product_id: string;
  description: string;
  price: number;
  weekday: Weekday;
  start_time: string;
  end_time: string;
}
