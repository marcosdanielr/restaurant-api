export type Category = {
  id: string;
  restaurant_id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export type CategoryInput = {
  name: string;
}
