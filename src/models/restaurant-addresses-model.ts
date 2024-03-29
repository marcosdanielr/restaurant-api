export type RestaurantAddress = {
  id: string;
  restaurant_id: string;
  city: string;
  state: string;
  street: string;
  district: string;
  number: number;
  zip_code: string;
  created_at: Date;
  updated_at: Date;
}


export type CreateRestaurantAddressRequest = {
  restaurant_id: string;
  city: string;
  state: string;
  street: string;
  district: string;
  number: number;
  zip_code: string;
}
