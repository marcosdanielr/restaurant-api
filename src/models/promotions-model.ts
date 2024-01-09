import { Weekday } from "../types/weekday";

export type Promotion = {
  id: string;
  product_id: string;
  description: string;
  price: number;
  weekday: Weekday;
  start_time: string;
  end_time: string;

  created_at: Date;
}


export type CreatePromotionRequest = {
  product_id: string;
  description: string;
  price: number;
  weekday: Weekday;
  start_time: string;
  end_time: string;
}
